import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { Roles } from 'src/common/role_User.common';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { SearchTourDto } from './dto/search-tour.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Tour } from './entities/tour.entity'; 

@Controller('tour')
@ApiTags('Tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  // @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  // @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiCreatedResponse({ description: 'Tạo tour thành công', type: Tour })
  @ApiBadRequestResponse({ description: 'Dữ liệu không hợp lệ' })
  async create(@Body() createTourDto: CreateTourDto) {
    return await this.tourService.create(createTourDto);
  }

  @Get(':id')
  // @AuthorizeRoles(Roles.ADMIN)
  // @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Lấy tour theo ID thành công', type: Tour })
  @ApiNotFoundResponse({ description: 'Không tìm thấy tour' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.tourService.getOne(id);
  }

  @Get()
  // @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  // @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiQuery({ name: 'keyword', required: false })
  @ApiOkResponse({ description: 'Danh sách tour', type: [Tour] })
  async findAll(@Query() searchTourDto: SearchTourDto) {
    return this.tourService.findAll(searchTourDto);
  }

  @Patch(':id')
  // @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  // @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Cập nhật tour thành công', type: Tour })
  @ApiNotFoundResponse({ description: 'Không tìm thấy tour' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    const res = await this.tourService.update(+id, updateTourDto);
    return res;
  }

  @Delete(':id')
  // @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  // @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @ApiOkResponse({ description: 'Xoá tour thành công' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy tour để xoá' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tourService.remove(id);
  }


  @Get(':id/hotel') 
  async getHotelByTourId(@Param('id', ParseIntPipe) id: number) {
    return this.tourService.getHotlWithTour(id);
  }
}
