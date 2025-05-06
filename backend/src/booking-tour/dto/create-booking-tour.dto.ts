import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsPositive, Min, Validate } from "class-validator";

export class CreateBookingTourDto {
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ example: '2023-10-01', description: 'Ngày đặt tour' })
    bookingTour_Date: string;
  
    @IsInt()
    @Min(0, { message: 'Tiền cọc không được âm' })
    @IsPositive({ message: 'Tiền cọc phải là số dương' })
    @ApiPropertyOptional({ example: 100000, description: 'Tiền cọc' })
    @Validate(IsInt, { message: 'Tiền cọc phải là số nguyên' })
    bookingTour_Deposit?: number;
  
    @IsInt()
    @IsPositive({ message: 'Tổng tiền phải là số dương' })
    @ApiProperty({ example: 1000000, description: 'Tổng tiền' })
    @Validate(IsInt, { message: 'Tổng tiền phải là số nguyên' })
    @IsNotEmpty()
    bookingTour_TotalPrice: number;

    
    @IsNumber()
    @ApiPropertyOptional({example:'1' , description:'Id của tour'})
    @IsNotEmpty()
    tourId:number



    
}
