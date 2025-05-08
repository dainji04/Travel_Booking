import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { TypeCar } from 'src/common/type_Car.common';

export class CreateTourDto {
  @ApiProperty({
    example: '2025-06-01T08:00:00.000Z',
    description: 'Ngày bắt đầu tour',
    type: String,
    format: 'date-time',
  })
  @IsString()
  tour_start: Date;

  @ApiProperty({
    example: '2025-06-05T17:00:00.000Z',
    description: 'Ngày kết thúc tour',
    type: String,
    format: 'date-time',
  })
  @IsString()
  tour_end: Date;

  @ApiProperty({
    example: 3500000,
    description: 'Tổng giá tiền của tour',
    type: Number,
  })
  @IsNumber()
  tour_totalPrice: number;

  @ApiProperty({
    example: 'Tour Đà Lạt 4 ngày 3 đêm',
    description: 'Tên tour du lịch',
    type: String,
  })
  @IsString()
  tour_name: string;

  @ApiProperty({
    example: 1,
    description: 'ID của địa điểm (location) mà tour thuộc về',
    type: Number,
  })
  @IsNumber()
  locationId: number;

  @IsArray()
  @IsEnum(TypeCar, { each: true })
  @ApiProperty({
    example: [TypeCar.MOTOBIKE, TypeCar.FOURSEAT],
    enum: TypeCar,
    isArray: true,
    description: 'Danh sách loại xe được hỗ trợ cho tour',
  })
  tour_typeCars: TypeCar[];
  @IsInt()
  @ApiProperty({ example: 1, description: 'ID của khách sạn (hotel)' })
  @IsNumber()
  hotelId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    example:'***.jdg' , description:' Ảnh của tour'
  })
  tour_Imgs?: string[];


  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiPropertyOptional({
    example:'Đà lạt đẹp vc , tôi chỉ muốn sau này đi đà lạt với chiếc Z900 =))) ' , 
    description:'Điểm đặc biệt trong tour'})
  tour_special?: string;

}
