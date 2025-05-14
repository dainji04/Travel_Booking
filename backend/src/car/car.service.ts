import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car) private readonly carRepo:Repository<Car>
  ){}

  async findByIds(ids: number[]): Promise<Car[]> {
    return this.carRepo.findBy({ id: In(ids) });
  }

}
