import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { Tour } from 'src/tour/entities/tour.entity';
import { SearchLocationDto } from './dto/search-location.dto';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { CreateHotelDto } from 'src/hotel/dto/create-hotel.dto';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Hotel) private readonly hotelRepository: Repository<Hotel>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const existingLocation = await this.locationRepository.findOne({
      where: { name: createLocationDto.name },
    });
    if (existingLocation) {
      throw new BadRequestException('Location already exists');
    }
    const location = this.locationRepository.create({
      name: createLocationDto.name,
      Describe: createLocationDto.Describe,
      avatar: createLocationDto.avatar,   
    });
    return await this.locationRepository.save(location);
  }


  async findOne(id: number) {
    console.log('Finding location with id:', id);
    const foundLocation = await this.locationRepository.findOne({
      where: { id },
      relations: ['Hotel'], 
    });
    if (!foundLocation) {
      console.error(`Location with id ${id} not found`);
      throw new NotFoundException('Location not found');
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
      .leftJoin('tour.Location', 'location')
      .leftJoin('tour.Ratings', 'rating')
      .leftJoin('tour.BookingTours', 'booking')
      .where('location.id = :id', { id })
      .select([
        'tour.id',
        'tour.Name',
        'tour.DayStart',
        'tour.DayEnd',
        'tour.Price',
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
        queryBuilder.andWhere('hotel.Price <= :maxPrice', { maxPrice: filter.maxPrice });
      }
      if(filter.minPrice) {
        queryBuilder.andWhere('hotel.Price >= :minPrice', { minPrice: filter.minPrice });
      }
      if(filter.maxStar) {
        queryBuilder.andWhere('hotel.Rate <= :maxStar', { maxStar: filter.maxStar });

        
      }
      if(filter.minStar) {
        queryBuilder.andWhere('hotel.Rate >= :minStar', { minStar: filter.minStar });
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
      qb.where('LOWER(location.Name) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }
  
    const allowedSortFields = ['id', 'Name', 'CreatedAt', 'UpdatedAt'];
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
