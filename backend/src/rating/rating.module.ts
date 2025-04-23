import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { TourModule } from 'src/tour/tour.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Rating]) , TourModule , UserModule]  ,
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
