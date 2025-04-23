import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { TourService } from 'src/tour/tour.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>,
    private readonly tourService: TourService,
    private readonly userUservice: UserService,
  ){}

  async create(createRatingDto: CreateRatingDto) {

    const tour = await this.tourService.getOne(createRatingDto.tourId);
    if(!tour) {
      throw new Error('Tour not found');
    }
    const rating = await this.ratingRepository.create({
      ...createRatingDto,
      tour,
    });
    return await this.ratingRepository.save(rating);
   
  }
  
}
