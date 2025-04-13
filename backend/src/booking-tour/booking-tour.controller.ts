import { Controller, Get, Post, Body,  Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { BookingTourService } from './booking-tour.service';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingTour } from './entities/booking-tour.entity';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { Roles } from 'src/common/role_User.common';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { get } from 'http';

@Controller('booking-tour')
export class BookingTourController {
  constructor(private readonly bookingTourService: BookingTourService) {}

  @ApiTags('Booking Tour')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Post(':userId')
  async createBookingTour(
    @Param('userId') userId:number,
    @Body() createBookingTour:CreateBookingTourDto
  ) {
    const res = await this.bookingTourService.createBookingTour(userId,createBookingTour)
    return res
  }

  @Get(':id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async getBookingTour(@Param('id') id: number) {
    const res = await this.bookingTourService.getBookingTour(id)
    return res
  }
  @Patch(':id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async updateBookingTour(
    @Param('id') id: number,
    @Body() updateBookingTour: UpdateBookingTourDto
  ) {
    const res = await this.bookingTourService.updateBookingTour(id, updateBookingTour);
    return res;
  }

  @Delete(':id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async removeBookingTour(@Param('id') id: number) {
    const res = await this.bookingTourService.removeBookingTour(id);
    return res;
  }

  @Get('user/:userId')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async getBookingTourByUserId(@Param('userId') userId: number) {
    const res = await this.bookingTourService.getBookingTourByUserId(userId);
    return res;
  } 
  @Get()
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async getAllBookingTour() {
    const res = await this.bookingTourService.getAllBookingTour();
    return res;
  }
}
 
