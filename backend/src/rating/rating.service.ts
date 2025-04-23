import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.userUservice.findOne(createRatingDto.userId);

    const existingRating = await this.ratingRepository.findOne({
      where:{
        user:{id:createRatingDto.userId} ,
        tour:{id:createRatingDto.tourId}
      }
    })
    if(existingRating) {
      throw new BadRequestException('You have already rated this tour');
    }

    if(createRatingDto.rating < 1 || createRatingDto.rating > 5) {
      throw new NotFoundException('Rating must be between 1 and 5');
    }


    const tour = await this.tourService.getOne(createRatingDto.tourId);
    if(!tour) {
      throw new Error('Tour not found');
    }
    const rating = await this.ratingRepository.create({
      ...createRatingDto,
      tour,
      user
    });
    return await this.ratingRepository.save(rating);
  }
  
}
