import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { CreateItineraryDto } from './dto/create-itineraty.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('itinerary')
@ApiTags('Itinerary')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}
  @Post()
  async createItinerary(@Body() createdto:CreateItineraryDto)
  {
    const res = await this.itineraryService.create(createdto)
    return res
  }
  @Get(':id')
  async findByTour(@Param('id') id:number) {
    const res = await this.itineraryService.findByTour(id)
    return res
  }


}
