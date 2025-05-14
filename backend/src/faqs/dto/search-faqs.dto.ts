import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchFaqsDto {


        @IsString()
        question:string
        
        @IsString()
        answer:string

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
        search?: string;

        @IsOptional()
        @IsNumber()
        locationId:number
}