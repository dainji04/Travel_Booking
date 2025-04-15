import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsPositive, Min, Validate } from "class-validator";

export class CreateBookingTourDto {
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ example: '2023-10-01', description: 'Ngày đặt tour' })
    bookingTour_Date: Date;
  
    @IsInt()
    @Min(0, { message: 'Tiền cọc không được âm' })
    @IsPositive({ message: 'Tiền cọc phải là số dương' })
    @ApiProperty({ example: 100000, description: 'Tiền cọc' })
    @Validate(IsInt, { message: 'Tiền cọc phải là số nguyên' })
    bookingTour_Deposit: number;
  
    @IsInt()
    @IsPositive({ message: 'Tổng tiền phải là số dương' })
    @ApiProperty({ example: 1000000, description: 'Tổng tiền' })
    @Validate(IsInt, { message: 'Tổng tiền phải là số nguyên' })
    @IsNotEmpty()
    bookingTour_TotalPrice: number;
}
