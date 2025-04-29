import { Controller, Get, Post, Body, Patch, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a rating' })

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Rating created successfully' })
  async create(@Body() createRatingDto: CreateRatingDto) {
    const result = await this.ratingService.create(createRatingDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Rating created successfully',
      data: result,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rating by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Rating updated successfully' })
  async update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    const result = await this.ratingService.update(+id, updateRatingDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Rating updated successfully',
      data: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rating by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Rating fetched successfully' })
  async findOne(@Param('id') id: string) {
    const result = await this.ratingService.getOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Rating fetched successfully',
      data: result,
    };
  }

  @Get('/tours/:tourId/rating-average')
  @ApiOperation({ summary: 'Get average rating for a tour' })
  @ApiParam({ name: 'tourId', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Average rating retrieved' })
  async getAverageRating(@Param('tourId') tourId: string) {
    const avg = await this.ratingService.getAvgRatingForTour(+tourId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Average rating fetched successfully',
      data: {
        tourId: +tourId,
        avg,
      },
    };
  }
}
