import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingTour } from './entities/booking-tour.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { BookingTourQueryDto } from './dto/search-booking-tour.dto';
import { Bill } from 'src/bill/entities/bill.entity';
import { TourService } from 'src/tour/tour.service';
import { PdfService } from './pdf-booking.service';
import { typeBooking } from 'src/common/type_Booking.common';

@Injectable()
export class BookingTourService {
  constructor(
    @InjectRepository(BookingTour) private readonly bookingTourRepo:Repository<BookingTour>,
    @InjectRepository(Bill) private readonly billRepo:Repository<Bill>,
    private readonly userService:UserService,
    private readonly emailService:EmailService,
    private readonly tourService:TourService,
    private readonly pdfService:PdfService


  ){}
  async createBookingTour(user: User, dto: CreateBookingTourDto) {
    const {
      bookingTour_TotalPrice,
      bookingTour_Date,
      tourId,
      bookingTour_Type,
      bookingTour_CustomDetails,
    } = dto;
  
    const bookingDate = new Date(bookingTour_Date);
    const now = new Date();
    bookingDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    if (bookingDate <= now)
      throw new BadRequestException('Booking date must be in the future');
  
    // Kiểm tra trùng booking theo ngày
    const existingBooking = await this.bookingTourRepo.findOne({
      where: {
        bookingTour_user: user,
        bookingTour_Date: bookingDate,
      },
    });
    if (existingBooking)
      throw new BadRequestException('Duplicate booking on this date');
  
    let tour = null;
    if (bookingTour_Type === typeBooking.PRESET) {
      if (!tourId) throw new BadRequestException('tourId is required for PRESET booking');
      tour = await this.tourService.getOne(tourId);
      if (!tour) throw new NotFoundException('Tour not found');
    }
  
    if (bookingTour_Type === typeBooking.CUSTOM && !bookingTour_CustomDetails) {
      throw new BadRequestException('Custom details are required for CUSTOM booking');
    }
  
    const deposit = Math.floor(bookingTour_TotalPrice * 0.3);
    const mustPaid = bookingTour_TotalPrice - deposit;
  
    const newBookingTour = this.bookingTourRepo.create({
      bookingTour_Date,
      bookingTour_TotalPrice,
      bookingTour_Deposit: deposit,
      bookingTour_user: user,
      bookingTour_Type,
      tour,
      // bookingTour_CustomDetails: bookingTour_CustomDetails || null,
    });
    await this.bookingTourRepo.save(newBookingTour);
  
    const pdfPath = await this.pdfService.generateBookingTourPdf({
      id: newBookingTour.id,
      userName: user.name,
      email: user.email,
      bookingDate: new Date().toLocaleDateString('vi-VN'),
      totalPrice: bookingTour_TotalPrice,
      deposit,
      mustPay: mustPaid,
    });
  
    const bill = this.billRepo.create({
      totalPrice: bookingTour_TotalPrice,
      paid: deposit,
      mustPaid,
      user,
    });
    await this.billRepo.save(bill);
  
    try {
      await this.emailService.handleSendMailBookingTour(
        user.email,
        user.name,
        bookingTour_TotalPrice,
        deposit,
        mustPaid,
        new Date().toLocaleDateString('vi-VN'),
        pdfPath
      );
    } catch (error) {
      console.error('Failed to send booking email:', error);
    }
  
    return {
      booking: newBookingTour,
      pdfPath: `/pdfs/booking-${newBookingTour.id}.pdf`,
    };
  }
  
  


  async getBookingTour(id:number) {
    const found = await this.bookingTourRepo.findOne({
      where:{id},
      relations:['bookingTour_user' , 'tour'],
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
          roles:true

        },
      },
    })
    if(!found) throw new NotFoundException('Booking tour not found')
    return found
  }
  async getAllBookingTour(query: BookingTourQueryDto) {
    const {
      page = 1,
      limit = 10,
      sort,
      search,
      bookingTour_Deposit,
      bookingTour_user_name,
    } = query;
  
    const qb = this.bookingTourRepo.createQueryBuilder('bookingTour')
      .leftJoinAndSelect('bookingTour.bookingTour_user', 'user');
  
    if (bookingTour_Deposit) {
      qb.andWhere('bookingTour.bookingTour_Deposit = :deposit', { deposit: bookingTour_Deposit });
    }
  
    if (bookingTour_user_name) {
      qb.andWhere('user.name ILIKE :userName', { userName: `%${bookingTour_user_name}%` });
    }
  
    if (search) {
      qb.andWhere(
        `(user.name ILIKE :search OR user.email ILIKE :search)`,
        { search: `%${search}%` },
      );
    }
  
    if (sort) {
      const [field, direction] = sort.split(':');
      const validFields = ['bookingTour_Date', 'bookingTour_TotalPrice', 'updated_at'];
      if (validFields.includes(field)) {
        qb.orderBy(`bookingTour.${field}`, direction.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
      }
    } else {
      qb.orderBy('bookingTour.updated_at', 'DESC');
    }
  
    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  
    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  
  async updateBookingTour(id:number, updateBookingTourDto: UpdateBookingTourDto) {
    const found = await this.bookingTourRepo.findOne({where:{id}})
    if(!found) throw new NotFoundException('Booking tour not found')
    if(updateBookingTourDto.bookingTour_Deposit > updateBookingTourDto.bookingTour_TotalPrice) 
      throw new BadRequestException('Total price must better than Deposit price')
    const currentDate = new Date();
    if (new Date(updateBookingTourDto.bookingTour_Date) <= currentDate) {
      throw new BadRequestException('Booking date must be in the future');
    }
    const updateData = {
      ...updateBookingTourDto,
      bookingTour_Type: updateBookingTourDto.bookingTour_Type as any,
      bookingTour_CustomDetails: updateBookingTourDto.bookingTour_CustomDetails
        ? JSON.stringify(updateBookingTourDto.bookingTour_CustomDetails)
        : undefined,
    };
    await this.bookingTourRepo.update(id, updateData);
    return this.getBookingTour(id)
  }
  async removeBookingTour(id:number) {
    const found = await this.bookingTourRepo.findOne({where:{id}})
    if(!found) throw new NotFoundException('Booking tour not found')
    await this.bookingTourRepo.delete(id)
    return {message:'Delete booking tour successfully'}
  }
  async getBookingTourByUserId(userId:number) {
    const found = await this.bookingTourRepo.find({
      where:{bookingTour_user:{id:userId}},
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
