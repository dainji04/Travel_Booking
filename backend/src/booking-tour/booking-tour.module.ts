import { Module } from '@nestjs/common';
import { BookingTourService } from './booking-tour.service';
import { BookingTourController } from './booking-tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingTour } from './entities/booking-tour.entity';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';
import { Bill } from 'src/bill/entities/bill.entity';
import { TourModule } from 'src/tour/tour.module';
import { PdfService } from './pdf-booking.service';

@Module({
  imports:[TypeOrmModule.forFeature([BookingTour , Bill]),EmailModule,UserModule  , TourModule],
  controllers: [BookingTourController],
  providers: [BookingTourService , PdfService],
})
export class BookingTourModule {}
