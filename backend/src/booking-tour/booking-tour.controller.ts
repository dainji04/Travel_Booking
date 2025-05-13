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
  Res,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { BookingTourService } from './booking-tour.service';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking-tour.dto';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/util/guard/authentication.guard';
import { AuthorizeGuard } from 'src/util/guard/authorization.guard';
import { Roles } from 'src/util/common/role_User.common';
import { AuthorizeRoles } from 'src/util/decorators/authorize.roles.decorator';
import { BookingTourQueryDto } from './dto/search-booking-tour.dto';
import { BookingTour } from './entities/booking-tour.entity';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { Account } from 'src/user/entities/user.entity';
import { Response } from 'express';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path'
import { PdfService } from './pdf-booking.service';

@Controller('booking-tour')
@ApiTags('Booking Tour')
export class BookingTourController {
  constructor(
    private readonly bookingTourService: BookingTourService,
    private readonly pdfService:PdfService

              
  ) {}

 
 
  
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  // @AuthorizeRoles(Roles.USER)
  @ApiCreatedResponse({ description: 'Đặt tour thành công', type: BookingTour })
  @ApiBadRequestResponse({ description: 'Dữ liệu không hợp lệ' })
  async createBookingTour(
    @CurrentUser() currentUser:Account,
    @Body() createBookingTour: CreateBookingTourDto,
  ) {
    return this.bookingTourService.createBookingTour(currentUser,createBookingTour);
  }

  @Get(':id')
  // @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Lấy thông tin booking tour theo ID thành công', type: BookingTour })
  @ApiNotFoundResponse({ description: 'Không tìm thấy booking tour' })
  async getBookingTour(@Param('id') id: number) {
    return this.bookingTourService.getBookingTour(id);
  }

  @Patch(':id')
  // @AuthorizeRoles(Roles.ADMIN)
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
  // @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  @ApiBearerAuth('token')
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Lấy danh sách booking tour theo user', type: [BookingTour] })
  async getBookingTourByUserId(@Param('userId') userId: number) {
    return this.bookingTourService.getBookingTourByUserId(userId);
  }

  @Get()
  // @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  @ApiBearerAuth('token')
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiQuery({ name: 'status', required: false, description: 'Lọc theo trạng thái booking' })
  @ApiOkResponse({ description: 'Lấy danh sách tất cả booking tour', type: [BookingTour] })
  async getAllBookingTour(@Query() query: BookingTourQueryDto) {
    return this.bookingTourService.getAllBookingTour(query);
  }


  @Get('download-pdf/:id')
  async downloadFilePdfBookingTour(
    @Param('id') id: number,
    @CurrentUser() currentUser: Account,
    @Res() res: Response,
  ) {
    const booking = await this.bookingTourService.findByIdBookingTour(id);
  
    if (booking.Acc.id !== currentUser.id && !currentUser.Roles.includes(Roles.ADMIN)) {
      throw new ForbiddenException('You are not allowed to download this PDF');
    }
  
    const pdfDir = path.join(process.cwd(), 'pdfs');
    let filePath = path.join(pdfDir, `booking-${id}.pdf`);
  
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
  
    if (!fs.existsSync(filePath)) {
      const {
        Acc,
        Day,
        Total_amount,
        Deposit,
      } = booking;
      const mustPay = Total_amount - Deposit;
      const { Email, Name } = currentUser;
  
      let pdfPath = await this.pdfService.generateBookingTourPdf({
        id,
        userName: Name,
        email:Email,
        bookingDate: String(Day),
        totalPrice: Total_amount,
        deposit: Deposit,
        mustPay,
      });
  
      filePath = pdfPath;
    }
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=booking-${id}.pdf`);
  
    const stream = fs.createReadStream(filePath);
    return stream.pipe(res);
  }
  





  
}
