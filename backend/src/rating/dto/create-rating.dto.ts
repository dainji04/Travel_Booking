import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Max, Min } from "class-validator";

export class CreateRatingDto {
    @IsOptional ()
    @Min(1)
    @Max(5)
    @ApiPropertyOptional({ example: '5 sao', description: 'Đánh giá số sao' })
    rating: number;
    @IsOptional ()
    @ApiPropertyOptional({ example: 'Cảnh đẹp quá', description: 'nội dung của rating' })
    comment: string;

    
    @ApiPropertyOptional({ example: '1', description: 'id của tour' })
    @IsNotEmpty()
    tourId: number;

    @ApiPropertyOptional({ example: '1', description: 'id của user' })
    @IsOptional()
    userId: number;

 
    
}
