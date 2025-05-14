import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class SearchBlogDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;
  
  
    @IsOptional()
    @IsString()
    sortBy?: 'id' | 'Thumbail' | 'Cover_img' | 'Content' | 'Create_at';
  
    @IsOptional()
    @IsEnum(['ASC', 'DESC'], { message: 'order must be ASC or DESC' })
    order?: 'ASC' | 'DESC';
  
    @IsOptional()
    @Type(() => Number)
    @IsNumberString()
    tourId?: number;
  
    @IsOptional()
    @IsString()
    search?: string;
}