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

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly emailService:EmailService
  ) {}

  async signUp(signUpDto:SignUpDto) {
    const {email,password,name} =signUpDto
    if(!email || !password) throw new BadRequestException('Missing input')
    const hashPassword = await hash(password,10)
    const newUser = this.userRepository.create({
      email,
      password:hashPassword,
      name
    })
    await this.emailService.handleSendmailSignUp(email)
    await this.userRepository.save(newUser)

    return newUser

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
}
