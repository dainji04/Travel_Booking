import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { LocationModule } from 'src/location/location.module';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  imports:[TypeOrmModule.forFeature([Tour]) , LocationModule ,HotelModule],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
