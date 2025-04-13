import { IsDateString, IsInt, IsNotEmpty, IsPositive, Min, Validate } from "class-validator";

export class CreateBookingTourDto {
    @IsNotEmpty()
    @IsDateString()
    bookingTour_Date: Date;
  
    @IsInt()
    @Min(0, { message: 'Tiền cọc không được âm' })
    bookingTour_Deposit: number;
  
    @IsInt()
    @IsPositive({ message: 'Tổng tiền phải là số dương' })
    bookingTour_TotalPrice: number;
}
