import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import {hash , compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { SignInDto } from './dto/signIn.dto';

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
  async signIn(signInDto:SignInDto) {
    try {
      if(!signInDto.email || ! signInDto.password) throw new BadRequestException(' Missing Input')
      const userExist = await this.userRepository
        .createQueryBuilder('users')
        .select(['users.id', 'users.email', 'users.password'])
        .where('users.email = :email', { email: signInDto.email })
        .getOne();

    if (!userExist) throw new BadRequestException('Bad Credentials');
      const [matchPassword, accessToken, refreshToken] = await Promise.all([
        compare(signInDto.password, userExist.password),
        sign({ id: userExist.id, email: userExist.email }, process.env.ACCESSTOKEN_KEY, { expiresIn: '15m' }),
        sign({ id: userExist.id }, process.env.REFRESHTOKEN_KEY, { expiresIn: '7d' }),
    ]);
      if (!matchPassword) throw new BadRequestException('Bad Credentials');
      delete userExist.password; 
      return { user: userExist, accessToken, refreshToken };

    } catch (error) {
      console.error('❌ Error processing sign-in:', error);
      throw error;
    }
    
    
  }
}
