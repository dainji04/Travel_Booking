import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/common/role_User.common';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersDto {
  @ApiPropertyOptional({ example: 'John', description: 'Search keyword' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: [Roles.USER],
    description: 'Filter by roles',
    enum: Roles,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Roles, { each: true })
  roles?: Roles[];

  @ApiPropertyOptional({ example: 'daiden', description: 'Sort to row' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'ASC', description: 'Sort order', enum: ['ASC', 'DESC'] })
  @IsOptional()
  @Transform(({ value }) => (value === 'DESC' ? 'DESC' : 'ASC'))
  sortOrder?: 'ASC' | 'DESC';

  @ApiPropertyOptional({ example: 10, description: 'Limit results' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number;

  @ApiPropertyOptional({ example: 1, description: 'Page number results' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;
}
