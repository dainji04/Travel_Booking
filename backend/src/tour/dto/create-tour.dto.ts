import { ApiProperty } from '@nestjs/swagger';

export class CreateTourDto {
  @ApiProperty({
    example: '2025-06-01T08:00:00.000Z',
    description: 'Ngày bắt đầu tour',
    type: String,
    format: 'date-time',
  })
  tour_start: Date;

  @ApiProperty({
    example: '2025-06-05T17:00:00.000Z',
    description: 'Ngày kết thúc tour',
    type: String,
    format: 'date-time',
  })
  tour_end: Date;

  @ApiProperty({
    example: 3500000,
    description: 'Tổng giá tiền của tour',
    type: Number,
  })
  tour_totalPrice: number;

  @ApiProperty({
    example: 'Tour Đà Lạt 4 ngày 3 đêm',
    description: 'Tên tour du lịch',
    type: String,
  })
  tour_name: string;

  @ApiProperty({
    example: 1,
    description: 'ID của địa điểm (location) mà tour thuộc về',
    type: Number,
  })
  locationId: number;
}
