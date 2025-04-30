import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty()
  partnerCode: string;

  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  requestType: string;

  @Type(() => Number)
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  lang: string;

  @IsString()
  @IsOptional()
  description?: string; 
}
