import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { typeBooking } from "src/util/common/type_Booking.common";

class BookingTourCustomDetailsDto {
  @ApiProperty({ example: ['Đà Lạt', 'Nha Trang'], description: 'Danh sách điểm đến' })
  @IsNotEmpty()
  destinations: string[];

  @ApiProperty({ example: 'Máy bay', description: 'Phương tiện di chuyển' })
  @IsNotEmpty()
  transportation: string;

  @ApiProperty({ example: 'Khách sạn 4 sao', description: 'Thông tin khách sạn' })
  @IsNotEmpty()
  hotel: string;

  @ApiPropertyOptional({ example: 'Yêu cầu ăn chay', description: 'Ghi chú thêm' })
  @IsOptional()
  notes?: string;
}

export class CreateBookingTourDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2023-10-01', description: 'Ngày đặt tour' })
  bookingTour_Date: string;

  @IsInt()
  @Min(0, { message: 'Tiền cọc không được âm' })
  @IsPositive({ message: 'Tiền cọc phải là số dương' })
  @ApiPropertyOptional({ example: 100000, description: 'Tiền cọc' })
  bookingTour_Deposit?: number;

  @IsInt()
  @IsPositive({ message: 'Tổng tiền phải là số dương' })
  @ApiProperty({ example: 1000000, description: 'Tổng tiền' })
  bookingTour_TotalPrice: number;

  @ApiPropertyOptional({ example: 1, description: 'ID của tour có sẵn (chỉ dùng cho preset)' })
  @IsOptional()
  @IsNumber()
  tourId?: number;

  @IsEnum(typeBooking)
  @ApiProperty({
    example: typeBooking.CUSTOM,
    description: 'Type booking tour',
    enum: typeBooking
  })
  @IsNotEmpty()
  bookingTour_Type: typeBooking;
  

  @ApiPropertyOptional({ description: 'Chi tiết tour tự chọn (chỉ dùng cho custom)' })
  @IsOptional()
  @ValidateNested()
  @Type(() => BookingTourCustomDetailsDto)
  bookingTour_CustomDetails?: BookingTourCustomDetailsDto;
}
