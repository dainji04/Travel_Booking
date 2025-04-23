import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { Roles } from 'src/common/role_User.common';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { SearchLocationDto } from './dto/search-location.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Locations')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

 @Post()
 @AuthorizeRoles(Roles.ADMIN)
 @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async create(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationService.create(createLocationDto);
  }
  
  @Get(':id')
  @AuthorizeRoles(Roles.ADMIN , Roles.USER)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async findOneWithTour(
    @Param('id') id: number,
  ) {
    return await this.locationService.findOneWithTours(id);
  }


  @Get()
  @AuthorizeRoles(Roles.ADMIN , Roles.USER)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async findAll(@Query() query:SearchLocationDto) {
    return await this.locationService.findAll(query);
  }
}
