import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';
import { SearchLocationDto } from './dto/search-location.dto';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const existingLocation = await this.locationRepository.findOne({
      where: { location_Name: createLocationDto.location_Name },
    });
    if (existingLocation) {
      throw new BadRequestException('Location already exists');
    }
    const location = this.locationRepository.create(createLocationDto);
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

  async findAll(query: SearchLocationDto) {
    const { search, sort = 'id', order = 'ASC', page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
  
    const qb = this.locationRepository.createQueryBuilder('location');
  
    if (search) {
      qb.where('LOWER(location.location_Name) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }
  
    const allowedSortFields = ['id', 'location_Name', 'createdAt', 'updatedAt'];
    if (allowedSortFields.includes(sort)) {
      qb.orderBy(`location.${sort}`, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
    } else {
      qb.orderBy('location.id', 'ASC'); 
    }
  
    qb.skip(skip).take(limit);
  
    const [locations, total] = await qb.getManyAndCount();
  
    return {
      data: locations,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
  

  
}
