import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  orderInfo: string;

  @IsString()
  @IsNotEmpty()
  redirectUrl: string;

  @IsString()
  @IsNotEmpty()
  ipnUrl: string;

  @IsString()
  @IsOptional()
  extraData?: string;

  @IsString()
  @IsOptional()
  orderGroupId?: string;

  @IsBoolean()
  @IsOptional()
  autoCapture?: boolean;

  @IsString()
  @IsOptional()
  lang?: string;


  @IsOptional()
  orderId:string
}
