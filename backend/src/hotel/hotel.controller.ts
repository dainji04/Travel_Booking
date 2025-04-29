import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizeRoles } from 'src/decorators/authorize.roles.decorator';
import { AuthorizeGuard } from 'src/guard/authorization.guard';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { Roles } from 'src/common/role_User.common';
import { SearchHotelDto } from './dto/search-hotel.dto';

@Controller('hotel')
@ApiTags('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}


  @Get(':id')
  @ApiOkResponse({ description: 'Lấy khách sạn theo ID thành công' })
  @ApiBadRequestResponse({ description: 'Lấy khách sạn theo ID thất bại' })
  @ApiForbiddenResponse({ description: 'Lấy khách sạn theo ID thất bại vì chưa đăng nhập ' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy khách sạn' })
  @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  async getOne(@Param('id') id: number) {
    const res  = await this.hotelService.findOne(id);
    return res
  }

  @Post()
  @ApiOkResponse({ description: 'Tạo khách sạn thành công' })
  @ApiBadRequestResponse({ description: 'Tạo khách sạn thất bại' })
  @ApiForbiddenResponse({ description: 'Tạo khách sạn thất bại vì chưa đăng nhập ' })
  @AuthorizeRoles(Roles.ADMIN ,Roles.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  async create(@Body() createHotelDto: CreateHotelDto) {
    const res = await this.hotelService.create(createHotelDto);
    return res
  }

  @Get(':id/tour')
  @ApiOkResponse({ description: 'Lấy danh sách tour theo khách sạn thành công' })
  @ApiBadRequestResponse({ description: 'Lấy danh sách tour theo khách sạn thất bại' })
  @ApiForbiddenResponse({ description: 'Lấy danh sách tour theo khách sạn thất bại vì chưa đăng nhập ' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy khách sạn' })
  @AuthorizeRoles(Roles.ADMIN, Roles.USER)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  async getTourByHotel(@Param('id') id: number) {
    const res = await this.hotelService.findOneWithTours(id);
    return res
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Cập nhật khách sạn thành công' })
  @ApiBadRequestResponse({ description: 'Cập nhật khách sạn thất bại' })
  @ApiForbiddenResponse({ description: 'Cập nhật khách sạn thất bại vì chưa đăng nhập ' })
  @AuthorizeRoles(Roles.ADMIN ,Roles.USER) // cho nay tao chua co chinh permisson => lười sửa role quá =)) 
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  async update(@Param('id') id:number,@Body() createHotelDto: UpdateHotelDto) {
    const res = await this.hotelService.update(id,createHotelDto);
    return res
  }

  @Get()
  @ApiOkResponse({ description: ' Tìm khách sạn thành công' })
  @ApiBadRequestResponse({ description: 'Tìm khách sạn thất bại' })
  @ApiForbiddenResponse({ description: 'Tìmkhách sạn thất bại vì chưa đăng nhập ' })
  @AuthorizeRoles(Roles.ADMIN ,Roles.USER) // cho nay tao chua co chinh permisson => lười sửa role quá =)) 
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  async getAll(@Query() searchHotelDto: SearchHotelDto) {
    const res = await this.hotelService.findAll(searchHotelDto);
    return res
  }

  
}
