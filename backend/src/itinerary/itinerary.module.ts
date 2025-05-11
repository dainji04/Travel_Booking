import { Module } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { ItineraryController } from './itinerary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from './entities/itinerary.entity';
import { Activity } from './entities/activity-itinerary.entity';
import { TourModule } from 'src/tour/tour.module';

@Module({
  imports:[TypeOrmModule.forFeature([Itinerary , Activity]) , TourModule],
  controllers: [ItineraryController],
  providers: [ItineraryService],
})
export class ItineraryModule {}
