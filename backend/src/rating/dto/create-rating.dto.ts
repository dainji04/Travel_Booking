import { IsNotEmpty, IsOptional, Max, Min } from "class-validator";

export class CreateRatingDto {
    @IsOptional ()
    @Min(1)
    @Max(5)
    rating: number;
    @IsOptional ()
    comment: string;


    @IsNotEmpty()
    tourId: number;

 
    
}
