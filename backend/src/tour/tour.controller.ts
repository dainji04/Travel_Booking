import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query, Search } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { Roles } from 'src/common/role_User.common';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { SearchTourDto } from './dto/search-tour.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('tour')
@ApiTags('Tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  @AuthorizeRoles(Roles.ADMIN  , Roles.USER)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  async create(@Body() createTourDto: CreateTourDto) {
    return  await this.tourService.create(createTourDto);
  }

@Get(':id')
@AuthorizeRoles(Roles.USER)
@UseGuards(AuthenticationGuard , AuthorizeGuard)
async getOne(@Param('id', ParseIntPipe) id: number) {
  return this.tourService.getOne(id);
}
@ApiProperty({
  description: 'Search for tours',
  type: SearchTourDto,  
  required: false,
})
@Get()
@AuthorizeRoles(Roles.ADMIN , Roles.USER)
@UseGuards(AuthenticationGuard , AuthorizeGuard)
async findAll(@Query() searchTourDto: SearchTourDto) {
  return this.tourService.findAll(searchTourDto);
}

@Patch(':id')
@AuthorizeRoles(Roles.ADMIN , Roles.USER)
@UseGuards(AuthenticationGuard , AuthorizeGuard)
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateTourDto: UpdateTourDto,
) {
  const res = await this.tourService.update(+id, updateTourDto)
  console.log( 'res from service', res)
  return res
}
@Delete(':id')
@AuthorizeRoles(Roles.ADMIN , Roles.USER)
@UseGuards(AuthenticationGuard , AuthorizeGuard)
async remove(@Param('id', ParseIntPipe) id: number) {
  return this.tourService.remove(id);
}




 


  
}
