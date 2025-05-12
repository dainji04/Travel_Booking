import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthorizeRoles } from 'src/util/decorators/authorize.roles.decorator';
import { Roles } from 'src/util/common/role_User.common';
import { AuthenticationGuard } from 'src/util/guard/authentication.guard';
import { AuthorizeGuard } from 'src/util/guard/authorization.guard';
import { SearchLocationDto } from './dto/search-location.dto';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Locations')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

 @Post()
//  @AuthorizeRoles(Roles.ADMIN , Roles.USER)
//  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async create(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationService.create(createLocationDto);
  }
  
  @Get(':id/tours')
  // @AuthorizeRoles(Roles.ADMIN , Roles.USER)
  // @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async findOneWithTour(
    @Param('id') id: number,
  ) {
    return await this.locationService.findOneWithTours(id);
  }

 
  @Get()
  // @AuthorizeRoles(Roles.ADMIN , Roles.USER)
  // @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async findAll(@Query() query:SearchLocationDto) {
    return await this.locationService.findAll(query);
  }

@Get(':id/hotels')
@ApiResponse({ status: 200, description: 'Get hotels by location' })
@ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
@ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
@ApiInternalServerErrorResponse({status:500 , description:'InternalServerError'} , )
// @AuthorizeRoles(Roles.ADMIN , Roles.USER)
// @UseGuards(AuthenticationGuard , AuthorizeGuard)
async getHotelsByLocation(
  @Param('id', ParseIntPipe) id: number,
  @Query('page') page = '1',
  @Query('limit') limit = '10',
  @Query('minPrice') minPrice?: string,
  @Query('maxPrice') maxPrice?: string,
  @Query('minStar') minStar?: string,
  @Query('maxStar') maxStar?: string,
) {
  return this.locationService.findOneWithHotels(
    id,
    parseInt(page),
    parseInt(limit),
    {
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minStar: minStar ? parseFloat(minStar) : undefined,
      maxStar: maxStar ? parseFloat(maxStar) : undefined,
    },
  );
}

}
