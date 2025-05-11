import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Itinerary } from './entities/itinerary.entity';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity-itinerary.entity';
import { TourService } from 'src/tour/tour.service';
import { CreateItineraryDto } from './dto/create-itineraty.dto';

@Injectable()
export class ItineraryService {
 
  constructor(
    @InjectRepository(Itinerary) private readonly itiRepo:Repository<Itinerary>,
    @InjectRepository(Activity) private readonly acRepo:Repository<Activity>,
    private readonly tourService:TourService
  ){}

  async create(dto:CreateItineraryDto) {
    const {tourId , itinerary_Title , activities} = dto

    const tour = await this.tourService.getOne(tourId)
    if(!tour) throw new NotFoundException('Tour not found')
    const itinerary = this.itiRepo.create({
      itinerary_Title:itinerary_Title,
      tour
    })
    itinerary.activities = activities.map(a => 
      this.acRepo.create({name: a.name, itinerary})
    );
    
    return this.itiRepo.save(itinerary)
  }
 async findByTour(tourId: number): Promise<Itinerary[]> {
    return this.itiRepo.find({
      where: { tour: { id: tourId } },
      relations: ['activities'],
    });
  }
  
}
