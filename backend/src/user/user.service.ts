import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import{hash} from 'bcrypt'
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

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
}
