import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { In, Repository } from 'typeorm';
import { TourService } from 'src/tour/tour.service';
import { Tour } from 'src/tour/entities/tour.entity';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car) private readonly carRepo:Repository<Car>,
    @InjectRepository(Tour) private readonly tourRepo:Repository<Tour>
  ){}

  async findByIds(ids: number[]): Promise<Car[]> {
    return this.carRepo.findBy({ id: In(ids) });
  }
  

  async create(createCarDto:CreateCarDto)
  {
   
    const {price , type , avatar , tourId} = createCarDto
    const tour = await this.findTourByIds(tourId)
    if(!tour) throw new NotFoundException('Tour not found')
    if(price <= 0 ) throw new BadRequestException('Price must be better than 0')
    const car = this.carRepo.create({
  
      Price:price,
      Type:type,
      Avatar:avatar,
      tours:tour
    })
    return await this.carRepo.save(car)
  }

  async findTourByIds(ids:number[]) {
    return this.tourRepo.findBy({id:In(ids)})
  }

}
