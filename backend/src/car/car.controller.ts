import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}



  @Post()
  async create(@Body() dto:CreateCarDto)
  {
    const res = await this.carService.create(dto)
    return res
  }

}
