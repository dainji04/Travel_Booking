import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnauthorizedException, Req, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import  {Request, Response} from'express'
import { GetUsersDto } from './dto/search.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { Roles } from 'src/common/role_User.common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me1')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.USER)
  @ApiTags('Authentication')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  async getProfile(@CurrentUser() currentUser:User) {
    return currentUser
  }
  @Post('signUp')
  @ApiTags('Authentication') 
  @ApiOperation({ summary: 'signUp a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  async signUp(@Body() signUpDto:SignUpDto) {
    const res = await this.userService.signUp(signUpDto)
    return res
  }
  @Post('signIn')
  @ApiTags('Authentication')
  @ApiOperation({ summary: 'User signIn' })
  @ApiResponse({ status: 200, description: 'signIn successful' })
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
  @ApiTags('Authentication') 
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'New access token ' })
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
  @ApiTags('Users')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async getOneUser(@Param('id') id:number) {
    const res = await this.userService.getOneUser(id)
    return res 
  }
  

  
  @Post('forgot-password')
  @AuthorizeRoles(Roles.USER)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @ApiTags('Password handle')
  @ApiOperation({ summary: 'Send forgot password email' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body('email') email:string) {
    const res = await this.userService.forgotPassword(email)
    return res
  }
  @Post('reset-password')
  @ApiTags('Password handle')
  @AuthorizeRoles(Roles.USER)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  async resetPassword(@Body('email')email:string,@Body('password')password:string , @Body('resetToken') resetToken:string) {
    const res = await this.userService.resetPassword(email,password,resetToken)
    return res
  }
  @Get()
  @ApiTags('Users')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @ApiOperation({ summary: 'Get a list of users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getUsers(@Query() query: GetUsersDto) {
    return await this.userService.getUsers(query);
  }

  

  

 

  
 
}
                                                                                                                              