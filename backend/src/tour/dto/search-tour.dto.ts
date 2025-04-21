import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";


export class SearchTourDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  tour_start?: Date;

  @IsOptional()
  tour_end?:Date

}