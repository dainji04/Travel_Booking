import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnauthorizedException, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import  {Request, Response} from'express'
import { GetUsersDto } from './dto/search.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto:SignUpDto) {
    const res = await this.userService.signUp(signUpDto)
    return res
  }
  @Post('signIn')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.userService.signIn(signInDto);
  
    if (!response) throw new UnauthorizedException('Invalid credentials');
  
    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
  
    return { user: response.user, accessToken: response.accessToken };
  }
  @Post('refresh-token')
  async refreshToken(@Req() req:Request , @Res({passthrough:true}) res:Response) {
    const refreshToken = req.cookies?.refreshToken
    if(!refreshToken) throw new UnauthorizedException('Refresh token missing')
    
    const response = await this.userService.refreshToken(refreshToken)
    res.cookie('refreshToken',response.tokenRefresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return {accessToken:response.accessToken}
  }
  @Get(':id')
  async getOneUser(@Param('id') id:number) {
    const res = await this.userService.getOneUser(id)
    return res 
  }
  

  
  @Post('forgot-password')
  async forgotPassword(@Body('email') email:string) {
    const res = await this.userService.forgotPassword(email)
    return res
  }
  @Post('reset-password')
  async resetPassword(@Body('email')email:string,@Body('password')password:string , @Body('resetToken') resetToken:string) {
    const res = await this.userService.resetPassword(email,password,resetToken)
    return res
  }
  @Get()
  async getUsers(@Query() query: GetUsersDto) {
    return await this.userService.getUsers(query);
  }

 

  
 
}
                                                                                                                              