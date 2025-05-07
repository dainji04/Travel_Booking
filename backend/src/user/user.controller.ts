import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnauthorizedException, Req, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import  {Request, Response} from'express'
import { GetUsersDto } from './dto/search.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { Roles } from 'src/common/role_User.common';
import { UpdateUserDto } from './dto/update-user.dto';
import { OtpUserDto } from './dto/otp-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me1')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.USER , Roles.ADMIN)
  @ApiTags('Authentication')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth('Access Token')
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
  @Post('verify-otp')
  @ApiTags('Authentication')
  @ApiResponse({ status: 200, description: 'OTP verification successful' })
  @ApiBadRequestResponse({status:400, description: 'Invalid OTP or expired OTP' })
  @ApiOperation({ summary: 'Verify OTP' })
  async verifyOtp(@Body() dto: OtpUserDto) {
    return this.userService.verifyOtp(dto);
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
  @ApiTags('Password handle')
  @ApiOperation({ summary: 'Send forgot password email' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body('email') email:string) {
    const res = await this.userService.forgotPassword(email)
    return res
  }
  @Post('reset-password')
  @ApiTags('Password handle')
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


  @Patch(':id')
  @ApiTags('Users')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.userService.update(id, updateUserDto);
    return res;
  }
  @Delete(':id')
  @ApiTags('Users')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async removeUser(@Param('id') id: number) {
    const res = await this.userService.remove(id);
    return res;
  }

  @Get('email/:email')
  @ApiTags('Users')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async getUserByEmail(@Param('email') email: string) {
    const res = await this.userService.getUserByEmail(email);
    return res;
  }
  @Post('email-password')
  @ApiTags('Users')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Get a user by email and password' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async getUserByEmailAndPassword(@Body('email') email: string, @Body('password') password: string) {
    const res = await this.userService.getUserByEmailAndPassword(email, password);
    return res;
  }
  @Patch('password/:id')
  @ApiTags('Users')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'User password updated successfully' })
  async updateUserPassword(@Param('id') id: number, @Body('password') password: string) {
    const res = await this.userService.updateUserPassword(id, password);
    return res;
  }
  @Patch('roles/:id')
  @ApiTags('Users')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.ADMIN)
  @ApiOperation({ summary: 'Update user roles' })
  @ApiResponse({ status: 200, description: 'User roles updated successfully' }) 
  async updateUserRoles(@Param('id') id: number, @Body('roles') roles: string[]) {
    const res = await this.userService.updateUserRoles(id, roles);
    return res;
  }

  @Post('logout')
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @AuthorizeRoles(Roles.USER , Roles.ADMIN)
  @ApiTags('Authentication')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  async logOut(@CurrentUser() currentUser: User, @Res({ passthrough: true }) res: Response) {
    const response = await this.userService.logout(currentUser.id);
    res.clearCookie('refreshToken');
    return response;
  }




  


  
 



  

  

 

  
 
}
                                                                                                                              