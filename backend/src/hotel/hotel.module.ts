import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel  , Tour]), LocationModule],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
