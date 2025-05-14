import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Repository } from 'typeorm';
import { SearchTourDto } from './dto/search-tour.dto';
import { LocationService } from 'src/location/location.service';
import { Itinerary } from 'src/itinerary/entities/itinerary.entity';
import { Activity } from 'src/itinerary/entities/activity-itinerary.entity';
import { HotelService } from 'src/hotel/hotel.service';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
    private readonly carService:CarService,
    private readonly locationService: LocationService,
    private readonly hotelService: HotelService,
  ) {}
  async create(createTourDto: CreateTourDto) {
    const { locationId, hotelId, DayStart, DayEnd, carIds , Imgs , Special , itineraries , Overview , Excludes } = createTourDto;

    const cars = await this.carService.findByIds(carIds)

    const location = await this.locationService.findOne(locationId);
    const hotel = await this.hotelService.findOne(hotelId);
    const now = new Date();
    const start = new Date(DayStart);
    const end = new Date(DayEnd);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 30) {
      throw new BadRequestException('Tour không thể dài hơn 30 ngày');
    }
    if (start < now) {
      throw new BadRequestException('Ngày bắt đầu tour phải là ngày trong tương lai');
    }
    if (start >= end) {
      throw new BadRequestException('Ngày bắt đầu phải trước ngày kết thúc');
    }
    const overlappingTour = await this.tourRepository.createQueryBuilder('tour')
      .where('tour.DayStart < :end AND tour.DayEnd > :start', { start, end })
      .andWhere('tour.locationId = :locationId', { locationId })
      .getMany();
    if (overlappingTour.length > 0) {
      throw new BadRequestException('Tour không thể trùng với tour khác');
    }
    let tour = this.tourRepository.create({
      ...createTourDto,
      Location:location,
      Hotel:hotel,
      Special,
      Overview,
      Imgs:Imgs || [],
      Excludes:Excludes || [],
      cars
    
    });

    tour.Itineraries = (itineraries || []).map((itineraryDto) => {
      const itinerary = new Itinerary();
      itinerary.Title = itineraryDto.itinerary_Title;
    
      itinerary.Activities = (itineraryDto.activities || []).map((activityDto) => {
        const activity = new Activity();
        activity.Name = activityDto.name;
        return activity;
      });
    
      return itinerary;
    });
    return this.tourRepository.save(tour);
  }

  
  async getOne(id: number) {
    const foundTour = await this.tourRepository.findOne({
      where: { id },
      relations: ['BookingTours' , 'Location' , 'Ratings' , 'Hotel'],
    });
    if (!foundTour) {
      throw new NotFoundException('Không tìm thấy tour');
    }
    return foundTour;
  }
  async findAll(query:SearchTourDto) {
    const { search, sort, page = 1, limit = 10 , tour_end , tour_start} = query;
    const skip = (page - 1) * limit;
    const take = limit;

    const qb = this.tourRepository.createQueryBuilder('tour')
      .skip(skip)
      .take(take);

    if (search) {
      qb.where('tour.Name LIKE :search', { search: `%${search}%` });
    }

    if (tour_start && tour_end) {
      qb.andWhere('tour.DayStart >= :tour_start AND tour.DayEnd <= :tour_end', { tour_start, tour_end });
    } 
    else {

      //check ngay bat dau 
      if (tour_start) {
        qb.andWhere('tour.DayStart >= :tour_start', { tour_start });
      }
      
      // check trc khi ket thuc
      if (tour_end) {
        qb.andWhere('tour.DayEnd <= :tour_end', { tour_end });
      }
    }

    //loc theo thu tu
    if (sort) {
      qb.orderBy('tour.DayStart', sort === 'asc' ? 'ASC' : 'DESC');
    }

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(total / limit),
    }
    
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    const tour = await this.tourRepository.findOne({ where: { id } });
    if (!tour) {
      throw new NotFoundException('Không tìm thấy tour');
    }
  
    const now = new Date();
    const tourStart = new Date(tour.DayStart);


    //check trungff
    const overlappingTour = await this.tourRepository.createQueryBuilder('tour')
      .where('tour.id != :id', { id })
      .andWhere('tour.DayStart < :end AND tour.DayEnd > :start', {
        start: updateTourDto.DayStart,
        end: updateTourDto.DayEnd,
      })
      .getMany();
    if (overlappingTour.length > 0) {
      throw new BadRequestException('Tour không thể trùng với tour khác');
    }

    //check tour da bat dau
    if (tourStart <= now) {
      throw new BadRequestException('Không thể chỉnh sửa tour đã bắt đầu');
    }
  
    //check tour thoi gian 
    if (updateTourDto.DayStart && new Date(updateTourDto.DayStart) <= now) {
      throw new BadRequestException('Ngày bắt đầu tour không được ở quá khứ');
    }
  
    if (
      updateTourDto.DayStart &&
      updateTourDto.DayEnd &&
      new Date(updateTourDto.DayEnd) <= new Date(updateTourDto.DayStart)
    ) {
      throw new BadRequestException('Ngày kết thúc phải sau ngày bắt đầu');
    }
  
    const updatedTour = this.tourRepository.merge(tour, updateTourDto);
    return this.tourRepository.save(updatedTour);
  }
  
  async remove(id: number) {
    const tour = await this.tourRepository.findOne({ where: { id }  ,relations:['BookingTours'] } );
    if (!tour) {
      throw new NotFoundException('Không tìm thấy tour');
    }

    if (tour.BookingTours && tour.BookingTours.length > 0) {
      throw new BadRequestException('Tour đã có người đặt không thể xóa');
    }

    return this.tourRepository.remove(tour);
  }


  async getHotlWithTour(id: number) {
    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: ['Hotel'],
    })
    if(!tour) throw new NotFoundException('Không tìm thấy tour');
    return tour.Hotel
  }

  


}
