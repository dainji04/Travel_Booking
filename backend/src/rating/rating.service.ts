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
        Acc:{id:createRatingDto.userId} ,
        Tour:{id:createRatingDto.tourId}
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
      Tour:tour,
      Acc:user
    });
    return await this.ratingRepository.save(rating);
  }


  async update(id:number,updateRatingDto:UpdateRatingDto) {
    
    const rating = await this.ratingRepository.findOne({where:{id} , relations:['Tour' , 'Acc']});
    if(!rating) {
      throw new NotFoundException('Rating not found');
    }
    if(updateRatingDto.rating && (updateRatingDto.rating < 1 || updateRatingDto.rating > 5)) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }
    return await this.ratingRepository.save({
      ...rating,
      ...updateRatingDto
    });
  }


  async getOne(id:number) {
    const rating = await this.ratingRepository.findOne({where:{id} , relations:['Tour' , 'Acc']});
    if(!rating) {
      throw new NotFoundException('Rating not found');
    }
    return rating;
  }

  async remove(id: number) {
    const rating = await this.ratingRepository.findOne({where:{id} , relations:['Tour' , 'Acc']});
    if(!rating) {
      throw new NotFoundException('Rating not found');
    }
    return await this.ratingRepository.remove(rating);
  }
    
  async getAvgRatingForTour(tourId: number) {
    const rs = await this.ratingRepository.createQueryBuilder('rating')
    .select('AVG(rating.rating)', 'avg')
    .where('rating.tourId = :tourId', { tourId })
    .getRawOne();
    return parseFloat(rs.avg) || 0;
   }
  
}
