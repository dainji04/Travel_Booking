import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { BookingTourService } from './booking-tour.service';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking-tour.dto';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/common/role_User.common';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { BookingTourQueryDto } from './dto/search-booking-tour.dto';
import { BookingTour } from './entities/booking-tour.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('booking-tour')
@ApiTags('Booking Tour')
export class BookingTourController {
  constructor(private readonly bookingTourService: BookingTourService) {}

 
 
  
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @AuthorizeRoles(Roles.USER)
  @ApiCreatedResponse({ description: 'Đặt tour thành công', type: BookingTour })
  @ApiBadRequestResponse({ description: 'Dữ liệu không hợp lệ' })
  async createBookingTour(
    @CurrentUser() currentUser:User,
    @Body() createBookingTour: CreateBookingTourDto,
  ) {
    return this.bookingTourService.createBookingTour(currentUser,createBookingTour);
  }

  @Get(':id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Lấy thông tin booking tour theo ID thành công', type: BookingTour })
  @ApiNotFoundResponse({ description: 'Không tìm thấy booking tour' })
  async getBookingTour(@Param('id') id: number) {
    return this.bookingTourService.getBookingTour(id);
  }

  @Patch(':id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Cập nhật booking tour thành công', type: BookingTour })
  @ApiNotFoundResponse({ description: 'Không tìm thấy booking tour để cập nhật' })
  async updateBookingTour(
    @Param('id') id: number,
    @Body() updateBookingTour: UpdateBookingTourDto,
  ) {
    return this.bookingTourService.updateBookingTour(id, updateBookingTour);
  }

  @Delete(':id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Xoá booking tour thành công' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy booking tour để xoá' })
  async removeBookingTour(@Param('id') id: number) {
    return this.bookingTourService.removeBookingTour(id);
  }

  @Get('user/:userId')
  @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  @ApiBearerAuth('token')
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Lấy danh sách booking tour theo user', type: [BookingTour] })
  async getBookingTourByUserId(@Param('userId') userId: number) {
    return this.bookingTourService.getBookingTourByUserId(userId);
  }

  @Get()
  @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  @ApiBearerAuth('token')
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiQuery({ name: 'status', required: false, description: 'Lọc theo trạng thái booking' })
  @ApiOkResponse({ description: 'Lấy danh sách tất cả booking tour', type: [BookingTour] })
  async getAllBookingTour(@Query() query: BookingTourQueryDto) {
    return this.bookingTourService.getAllBookingTour(query);
  }
}
