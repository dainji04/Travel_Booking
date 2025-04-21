import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Repository } from 'typeorm';
import { SearchTourDto } from './dto/search-tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
  ) {}
  async create(createTourDto: CreateTourDto) {
    const now = new Date();
    const maxDurationDays = 30;
    const start = new Date(createTourDto.tour_start);
    const end = new Date(createTourDto.tour_end);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays > maxDurationDays) {
      throw new BadRequestException(`Tour không thể dài hơn ${maxDurationDays} ngày`);
    }
    if (new Date(createTourDto.tour_start) < new Date()) {
      throw new BadRequestException('tour phải là ngày trong tương lai');
    }
    if (new Date(createTourDto.tour_start) <= new Date(createTourDto.tour_end)) {
      throw new BadRequestException('bắt đầu tour phải trước kết thúc tour');
    }

    const overlappingTour = await this.tourRepository.createQueryBuilder('tour')
      .where('tour.tour_start < :end AND tour.tour_end > :start', {
        start: createTourDto.tour_start,
        end: createTourDto.tour_end,
      })
      .getMany();

    if (overlappingTour.length > 0) {
      throw new BadRequestException('Tour không thể trùng với tour khác');
    }

    const tour = this.tourRepository.create(createTourDto);

    if (tour.bookingTours && tour.bookingTours.length > 0) {
      throw new BadRequestException('Tour đã có người đặt không thể xóa');
    }

    if (new Date(tour.tour_start) <= now) {
      throw new BadRequestException('Không thể chỉnh sửa tour đã bắt đầu');
    }

    return this.tourRepository.save(tour);
  }

  async getOne(id: number) {
    const foundTour = await this.tourRepository.findOne({
      where: { id },
      relations: ['bookingTours'],
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
      qb.where('tour.tour_name LIKE :search', { search: `%${search}%` });
    }

    if (tour_start && tour_end) {
      qb.andWhere('tour.tour_start >= :tour_start AND tour.tour_end <= :tour_end', { tour_start, tour_end });
    } 
    else {

      //check ngay bat dau 
      if (tour_start) {
        qb.andWhere('tour.tour_start >= :tour_start', { tour_start });
      }
      
      // check trc khi ket thuc
      if (tour_end) {
        qb.andWhere('tour.tour_end <= :tour_end', { tour_end });
      }
    }

    //loc theo thu tu
    if (sort) {
      qb.orderBy('tour.tour_start', sort === 'asc' ? 'ASC' : 'DESC');
    }

    return qb.getManyAndCount();
    
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    const tour = await this.tourRepository.findOne({ where: { id } });
    if (!tour) {
      throw new NotFoundException('Không tìm thấy tour');
    }
  
    const now = new Date();
    const tourStart = new Date(tour.tour_start);

    //check tour da bat dau
    if (tourStart <= now) {
      throw new BadRequestException('Không thể chỉnh sửa tour đã bắt đầu');
    }
  
    //check tour thoi gian 
    if (updateTourDto.tour_start && new Date(updateTourDto.tour_start) <= now) {
      throw new BadRequestException('Ngày bắt đầu tour không được ở quá khứ');
    }
  
    if (
      updateTourDto.tour_start &&
      updateTourDto.tour_end &&
      new Date(updateTourDto.tour_end) <= new Date(updateTourDto.tour_start)
    ) {
      throw new BadRequestException('Ngày kết thúc phải sau ngày bắt đầu');
    }
  
    const updatedTour = this.tourRepository.merge(tour, updateTourDto);
    return this.tourRepository.save(updatedTour);
  }
  
  async remove(id: number) {
    const tour = await this.tourRepository.findOne({ where: { id } });
    if (!tour) {
      throw new NotFoundException('Không tìm thấy tour');
    }

    if (tour.bookingTours && tour.bookingTours.length > 0) {
      throw new BadRequestException('Tour đã có người đặt không thể xóa');
    }

    return this.tourRepository.remove(tour);
  }

  


}
