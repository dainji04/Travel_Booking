import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { Otp } from './entities/otpUser.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User , Otp]) , EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
