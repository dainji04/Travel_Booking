import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import {hash , compare} from 'bcrypt'
import {sign , verify} from 'jsonwebtoken'
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { SignInDto } from './dto/signIn.dto';
import { decode } from 'punycode';
import { GetUsersDto } from './dto/search.dto';
import { Roles } from 'src/common/role_User.common';
import * as crypto from 'crypto';
import { Otp } from './entities/otpUser.entity';
import { OtpUserDto } from './dto/otp-user.dto';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly emailService:EmailService ,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, name } = signUpDto;
  
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) throw new BadRequestException('Email đã tồn tại');
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiresAt = new Date(Date.now() + 5* 60 * 1000);
    console.log('expire' , expiresAt)
    const hashedPassword = await hash(password, 10);
  
    const otpRecord = this.otpRepository.create({
      email,
      otpHash,
      expiresAt,
      tempPassword: hashedPassword,
      tempName: name,
    });
    await this.otpRepository.save(otpRecord);
  
   
    await this.emailService.handleSendmailSignUp(email, otp);
  
    return { message: 'Mã OTP đã được gửi đến email của bạn. Vui lòng xác thực.' };
  }

  async verifyOtp(dto:OtpUserDto) {
    const { email, otp } = dto;
    const record = await this.otpRepository.findOneBy({ email });
    if (!record) throw new NotFoundException('OTP không tồn tại');
    console.log('Server now:', new Date().toISOString());
    console.log('OTP expiresAt:', record.expiresAt.toISOString());
    if(new Date() > record.expiresAt) throw new BadRequestException('OTP đã hết hạn')
    const hashOtp = crypto.createHash('sha256').update(otp).digest('hex');
    if (record.otpHash !== hashOtp) throw new BadRequestException('OTP không hợp lệ');
    const newUser = this.userRepository.create({
      email:record.email,
      password:record.tempPassword,
      name:record.tempName,
      isVerified:true
    })
    await this.userRepository.save(newUser)
    await this.otpRepository.delete({email})
    return { message: 'Xác minh thành công, tài khoản đã được tạo!' };
  }
  
  async createUserByAdmin(createUserDto:CreateUserDto) {
    if(createUserDto.email) throw new BadRequestException('EMAIL VALID')
    const hashPassword = await hash(createUserDto.password, 10)
    const newUser = this.userRepository.create({
      email:createUserDto.email,
      name:createUserDto.name,
      password:hashPassword,
      roles:createUserDto.roles
    })
    await this.userRepository.save(newUser)
    return newUser

  }
  async signIn(signInDto: SignInDto) {
    if (!signInDto.email || !signInDto.password) {
      throw new BadRequestException('Missing Input');
    }
    if(!signInDto.email) throw new BadRequestException('Email Invalid')
  
    const userExist = await this.userRepository.findOne({
      where: { email: signInDto.email },
      select: ['id', 'email', 'password'],
    });
  
    if (!userExist) throw new UnauthorizedException('Bad Credentials');
  
    const isPasswordValid = await compare(signInDto.password, userExist.password);
    if (!isPasswordValid) throw new UnauthorizedException('Bad Credentials');
  
    const accessToken = sign(
      { id: userExist.id, email: userExist.email },
      process.env.ACCESSTOKEN_KEY,
      { expiresIn: '15m' },
    );
  
    const refreshToken = sign(
      { id: userExist.id },
      process.env.REFRESHTOKEN_KEY,
      { expiresIn: '7d' },
    );
  
    delete userExist.password;
  
    await this.emailService.handleSendmailSignIn(userExist.email);
  
    return { user: userExist, accessToken, refreshToken };
  }
  async refreshToken(refreshToken:string) {
    try {
      const decoded = verify(refreshToken,process.env.REFRESHTOKEN_KEY)
      const user = await this.userRepository.findOne({where:{id:decoded.id}})
      if(!user) throw new UnauthorizedException('Invalid token')
      const accessToken  = sign({id:user.id,email:user.email},process.env.ACCESSTOKEN_KEY,{ expiresIn: '7d' })
      const tokenRefresh = sign({ id: user.id },process.env.REFRESHTOKEN_KEY, { expiresIn: '7d' });
      return {accessToken,tokenRefresh}
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
  async getOneUser(id:number) {
    const user = await this.userRepository.findOne({
      where:{id}
    })
    if(!user) throw new NotFoundException('User not found')
    return user 
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) throw new NotFoundException('User not found')
  
    const resetToken = sign({ email }, process.env.ACCESSTOKEN_KEY, { expiresIn: '1h' })
    const hashedResetToken = await hash(resetToken, 10) 
  
    user.resetToken = hashedResetToken
    await this.userRepository.save(user)
    await this.emailService.handleForgotPassword(email, resetToken)
    console.log(resetToken)
  
    return { message: 'Reset token sent to email' }
  }
  async resetPassword(email: string, password: string, resetToken: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) throw new NotFoundException('User not found')
  
    const isTokenValid = await compare(resetToken, user.resetToken) 
    if (!isTokenValid) throw new BadRequestException('Invalid or expired reset token')
      
    user.password = await hash(password, 10)
    user.resetToken = null
    await this.userRepository.save(user)
    await this.emailService.handleResetPassword(email)
    try {
      const decoded = verify(resetToken,process.env.ACCESSTOKEN_KEY)
      if(decoded.email !== user.email) throw new BadRequestException('Invalid token')
    } catch (error) {
      throw new BadRequestException('Expired or invalid token')
    }
  
    return { message: 'Password reset successfully' }
  
  }

  async getUsers(query: GetUsersDto) {
    let { search, roles, sortBy = 'id', sortOrder = 'ASC', limit = 10, page = 1 } = query;

  
    limit = Math.max(1, Math.min(limit, 100)); 
    page = Math.max(1, page); 

    //check validator field in db 
    const validSortFields = ['id', 'name', 'email', 'roles', 'createdAt']; 
    if (!validSortFields.includes(sortBy)) {
      throw new BadRequestException(`Invalid sortBy field: ${sortBy}`);
    }

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder.andWhere('(LOWER(user.email) LIKE LOWER(:search) OR LOWER(user.name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    //search for roles
    if (roles && roles.length > 0) {
      queryBuilder.andWhere(':roles = ANY(user.roles)', { roles });
    }

    //sort
    queryBuilder.orderBy(`user.${sortBy}`, sortOrder as 'ASC' | 'DESC');

    //paging
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findOne(id:number) {
    return await this.userRepository.findOne({where:{id}})
  }
  async update(id:number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user) throw new NotFoundException('User not found')
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto
    })
    return updatedUser
  }
  async remove(id: number) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user) throw new NotFoundException('User not found')
    await this.userRepository.delete(id)
    return user
  }
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user) throw new NotFoundException('User not found')
    await this.userRepository.delete(id)
    return user
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  
  async getUserByEmailAndPassword(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    return user;
  }
  async updateUserPassword(id: number, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.password = await hash(newPassword, 10);
    await this.userRepository.save(user);
    return user;
  }
  async updateUserRoles(id: number, roles: string[]) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.roles = roles.map(role => role as Roles);
    await this.userRepository.save(user);
    return user;
  }
  async logout(id: number) {
    return {msg:'Logout successfully'} 
  }
}
