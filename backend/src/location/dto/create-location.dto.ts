import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

export class CreateLocationDto {
   
    @ApiPropertyOptional({ example: 'Đà Lạt', description: 'Tên địa điểm' })
    @IsOptional()
    location_Name: string;
    @ApiPropertyOptional({ example: 'Chỗ này thật đẹp', description: 'Miêu tả địa điểm' })
    @IsOptional()
    location_Description: string;
    @ApiPropertyOptional({ example: 'Đà lạt mùa xuân', description: 'Ảnh địa điểm' })
    @IsOptional()
    location_Image: string;

 
}
