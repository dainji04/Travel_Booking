import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

export class CreateLocationDto {
   
    @IsOptional()
    location_Name: string;
    @IsOptional()
    location_Description: string;
    @IsOptional()
    location_Image: string;

 
}
