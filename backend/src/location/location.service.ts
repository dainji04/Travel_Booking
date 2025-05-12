import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';
import { SearchLocationDto } from './dto/search-location.dto';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Hotel) private readonly hotelRepository: Repository<Hotel>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const existingLocation = await this.locationRepository.findOne({
      where: { Name: createLocationDto.name },
    });
    if (existingLocation) {
      throw new BadRequestException('Location already exists');
    }
    const location = this.locationRepository.create({
      Name:createLocationDto.name,
      Describe:createLocationDto.Describe,
      Avatar:createLocationDto.Image
    });
    return await this.locationRepository.save(location);
  }


  async findOne(id:number ) {
    const foundLocation = await this.locationRepository.findOne({
      where: { id },
      relations:['hotel']
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

  async findOneWithHotels(id: number , page:number , limit:number , filter: {
    minPrice?: number;
    maxPrice?: number;
    minStar?: number;
    maxStar?: number;
  }) {

    const queryBuilder = this.hotelRepository
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.location', 'location')
      .where('location.id = :id', { id })
      if(filter.maxPrice) {
        queryBuilder.andWhere('hotel.price <= :maxPrice', { maxPrice: filter.maxPrice });
      }
      if(filter.minPrice) {
        queryBuilder.andWhere('hotel.price >= :minPrice', { minPrice: filter.minPrice });
      }
      if(filter.maxStar) {
        queryBuilder.andWhere('hotel.star <= :maxStar', { maxStar: filter.maxStar });

        
      }
      if(filter.minStar) {
        queryBuilder.andWhere('hotel.star >= :minStar', { minStar: filter.minStar });
      }
      queryBuilder.skip((page - 1) * limit).take(limit);
      const [hotels, total] = await queryBuilder.getManyAndCount();
      return {
        data: hotels,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
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
