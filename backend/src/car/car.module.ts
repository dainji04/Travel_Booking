import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { TourModule } from 'src/tour/tour.module';
import { Tour } from 'src/tour/entities/tour.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Car , Tour])],
  controllers: [CarController],
  providers: [CarService],
  exports:[CarService]
})
export class CarModule {}
