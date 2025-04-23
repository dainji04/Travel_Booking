import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create({
      ...createLocationDto,
    });
    return await this.locationRepository.save(location);
  }


  async findOne(id:number ) {
    const foundLocation = await this.locationRepository.findOne({
      where: { id },
    });
    if (!foundLocation) {
      throw new Error('Location not found');
    }
    return foundLocation;
  }

  async findOneWithTours(id: number) {
    const location = await this.locationRepository.findOne({
      where: { id },
    });
  
    if (!location) {
      throw new NotFoundException('Location not found');
    }
  
    const tours = await this.tourRepository
      .createQueryBuilder('tour')
      .leftJoin('tour.location', 'location')
      .leftJoin('tour.ratings', 'rating')
      .leftJoin('tour.bookingTours', 'booking')
      .where('location.id = :id', { id })
      .select([
        'tour.id',
        'tour.tour_name',
        'tour.tour_start',
        'tour.tour_end',
        'tour.tour_totalPrice',
      ])
      .addSelect('AVG(rating.rating)', 'ratingAverage')
      .addSelect('COUNT(DISTINCT booking.id)', 'bookingCount')
      .groupBy('tour.id')
      .getRawMany();
  
    return {
      ...location,
      tours: tours.map(tour => ({
        id: tour.tour_id,
        tour_name: tour.tour_tour_name,
        tour_start: tour.tour_tour_start,
        tour_end: tour.tour_tour_end,
        tour_totalPrice: tour.tour_tour_totalPrice,
        ratingAverage: parseFloat(tour.ratingAverage) || 0,
        bookingCount: parseInt(tour.bookingCount, 10),
      }))
    };
  }
  
}
