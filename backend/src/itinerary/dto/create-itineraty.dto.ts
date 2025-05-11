import { Type } from "class-transformer";
import { ArrayMinSize, IsString, ValidateNested } from "class-validator";
import { CreateActivityDto } from "./create-activity.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateItineraryDto {
    @IsString()
    @ApiPropertyOptional(
      {
        example:'Đà Nẵng - Đà Lạt',
        description:'Tiêu đề'
      }
    )
    itinerary_Title: string;
  
    @ValidateNested({ each: true })
    @Type(() => CreateActivityDto)
    @ArrayMinSize(1)
    activities: CreateActivityDto[];
  
    @IsString()
    @ApiPropertyOptional({
      example:'1',
      description:'ID của Tour'
    })
    tourId: number; 
  }