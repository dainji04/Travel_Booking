import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/common/role_User.common';
import { Transform } from 'class-transformer';

export class GetUsersDto {
  @IsOptional()
  @IsString()
  search?: string; // Tìm kiếm theo email hoặc tên

  @IsOptional()
  @IsEnum(Roles, { each: true })
  roles?: Roles[]; // Lọc theo vai trò

  @IsOptional()
  @IsString()
  sortBy?: string; // Sắp xếp theo trường nào

  @IsOptional()
  @Transform(({ value }) => value === 'DESC' ? 'DESC' : 'ASC')
  sortOrder?: 'ASC' | 'DESC'; // Hướng sắp xếp

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number; // Giới hạn số user trả về

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number; // Phân trang
}
