import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
  

}
