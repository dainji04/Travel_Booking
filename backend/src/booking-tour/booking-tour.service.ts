import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingTour } from './entities/booking-tour.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BookingTourService {
  constructor(
    @InjectRepository(BookingTour) private readonly bookingTourRepo:Repository<BookingTour>,
    private readonly userService:UserService,
    private readonly emailService:EmailService

  ){}
  async createBookingTour(userId:number ,createBookingTourDto: CreateBookingTourDto) {

    const user = await this.userService.getOneUser(userId)
    if(!user) throw new NotFoundException('User not found')
    if(createBookingTourDto.bookingTour_Deposit > createBookingTourDto.bookingTour_TotalPrice) 
      throw new BadRequestException('Total price must better than Deposit price')
    const duplicate = await this.bookingTourRepo.findOne({
      where:{bookingTour_user:user,bookingTour_Date:createBookingTourDto.bookingTour_Date}
    })
    const currentDate = new Date();
    if (new Date(createBookingTourDto.bookingTour_Date) <= currentDate) {
      throw new BadRequestException('Booking date must be in the future');
    }
    const deposit = Math.floor(createBookingTourDto.bookingTour_TotalPrice * 0.3 )
    if(duplicate) throw new BadRequestException('Duplicate date ')
    const newBookingTour = await this.bookingTourRepo.create({
    bookingTour_Date:createBookingTourDto.bookingTour_Date,
    bookingTour_TotalPrice:createBookingTourDto.bookingTour_TotalPrice,
    bookingTour_Deposit:deposit,
    bookingTour_user:user
  })
  await this.bookingTourRepo.save(newBookingTour)
  try {
    await this.emailService.handleSendMailBookingTour(user.email)
  } catch (error) {
    console.error('Failed', error);
  }
 
  return newBookingTour

  
  }


  async getBookingTour(id:number) {
    const found = await this.bookingTourRepo.findOne({
      where:{id},
      relations:['bookingTour_user'],
      select: {
        id: true,
        bookingTour_Date: true,
        bookingTour_Deposit: true,
        bookingTour_TotalPrice: true,
        updated_at: true,
        bookingTour_user: {
          id: true,
          name: true,
          email: true,
        },
      },
    })
    if(!found) throw new NotFoundException('Booking tour not found')
    return found
  }


  
}
