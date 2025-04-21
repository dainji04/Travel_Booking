import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BookingTourQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Trang hiện tại' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Số lượng phần tử mỗi trang' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'createdAt:DESC', description: 'Sắp xếp theo trường cụ thể (vd createdAt:DESC)' })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({ example: 'SG mãi đỉnh bro ơi ', description: 'Từ khóa tìm kiếm liên quan đến tour hoặc user' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 500000, description: 'Tiền cọc booking tour VietNamDong' })
  @IsOptional()
  bookingTour_Deposit?: number;

  @ApiPropertyOptional({ example: 'Nguyen Van Dai', description: 'Tên người đặt tour' })
  @IsOptional()
  bookingTour_user_name?: string;
}
