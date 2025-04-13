import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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

@Controller('booking-tour')
export class BookingTourController {
  constructor(private readonly bookingTourService: BookingTourService) {}

  @ApiTags('Booking Tour')
  @AuthorizeRoles(Roles.USER)
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
  async getBookingTour(@Param('id') id: number) {
    const res = await this.bookingTourService.getBookingTour(id)
    return res
 

  }}
