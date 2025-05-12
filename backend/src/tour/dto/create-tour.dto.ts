import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { TypeCar } from 'src/common/type_Car.common';
import { CreateItineraryDto } from 'src/itinerary/dto/create-itineraty.dto';

export class CreateTourDto {
  @ApiProperty({
    example: '2025-06-01T08:00:00.000Z',
    description: 'Ngày bắt đầu tour',
    type: String,
    format: 'date-time',
  })
  @IsString()
  DayStart: Date;

  @ApiProperty({
    example: '2025-06-05T17:00:00.000Z',
    description: 'Ngày kết thúc tour',
    type: String,
    format: 'date-time',
  })
  @IsString()
  DayEnd: Date;

  @ApiProperty({
    example: 3500000,
    description: 'Tổng giá tiền của tour',
    type: Number,
  })
  

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
  type: TypeCar[];
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
  Imgs?: string[];


  @IsOptional()
  @IsArray()
  @IsString({each:true})
  @ApiPropertyOptional({
    example:'Accommondation at-4star hotel(or upgraded upon request',
    description:''
  })
  Excludes?:string[]

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiPropertyOptional({
    example:'Đà lạt đẹp vc , tôi chỉ muốn sau này đi đà lạt với chiếc Z900 =))) ' , 
    description:'Điểm đặc biệt trong tour'})
    Special?: string;



  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiPropertyOptional({
    example:'Đà lạt đẹp vc , tôi chỉ muốn sau này đi đà lạt với chiếc Z900 =))) ' , 
    description:'Điểm đặc biệt trong tour'})
    Overview?: string;


  @IsNotEmpty()
  @ApiPropertyOptional({
    example:''
  })
  itineraries: CreateItineraryDto[];

}




