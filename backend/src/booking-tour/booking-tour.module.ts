import { Module } from '@nestjs/common';
import { BookingTourService } from './booking-tour.service';
import { BookingTourController } from './booking-tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingTour } from './entities/booking-tour.entity';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[TypeOrmModule.forFeature([BookingTour]),EmailModule,UserModule ],
  controllers: [BookingTourController],
  providers: [BookingTourService],
})
export class BookingTourModule {}
