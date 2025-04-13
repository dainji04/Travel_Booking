import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingTourService } from './booking-tour.service';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingTour } from './entities/booking-tour.entity';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('booking-tour')
export class BookingTourController {
  constructor(private readonly bookingTourService: BookingTourService) {}

  @ApiTags('Booking Tour')
  @Post(':userId')
  async createBookingTour(
    @Param('userId') userId:number,
    @Body() createBookingTour:CreateBookingTourDto
  ) {
    const res = await this.bookingTourService.createBookingTour(userId,createBookingTour)
    return res
  }
 

  }
