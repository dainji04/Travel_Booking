import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchLocationDto {
  @ApiPropertyOptional({ example: 'đà lạt', description: 'Tìm theo tên địa điểm' })
  search?: string;

  @ApiPropertyOptional({ example: 'location_Name', description: 'Sắp xếp theo trường nào' })
  sort?: string;

  @ApiPropertyOptional({ example: 'ASC', description: 'Thứ tự sắp xếp: ASC hoặc DESC' })
  order?: 'ASC' | 'DESC';

  @ApiPropertyOptional({ example: 1 })
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;
}
