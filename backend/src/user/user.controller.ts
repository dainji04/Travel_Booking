import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import  {Response} from'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto:SignUpDto) {
    const res = await this.userService.signUp(signUpDto)
    return res
  }
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const response = await this.userService.signIn(signInDto)
    
    if(!response) throw new UnauthorizedException('Invalid creadentials')
    res.cookie('refreshToken',response.refreshToken, {
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge:7 * 24 * 60 * 60 * 1000, 
    })
    return {
      user: response.user,
      accessToken: response.accessToken,
    };

    

  }

 
}
