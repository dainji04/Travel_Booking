import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { Otp } from './entities/otpUser.entity';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/google.oauth.config';
import { GoogleStrategy } from 'src/auth/strategy/google.strategy.google';

@Module({
  imports:[TypeOrmModule.forFeature([User , Otp]) , EmailModule,

  ConfigModule.forFeature(googleOauthConfig)
  ],
  controllers: [UserController],
  providers: [UserService , GoogleStrategy],
  exports:[UserService]
})
export class UserModule {}
