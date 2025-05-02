import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class OtpUserDto {
  @IsString()
  @ApiPropertyOptional({example:'nguyenphuthinh040507@gmail.com',description:'email của bạn'})
  email: string;
  @IsString()
  @ApiPropertyOptional({example:'123456',description:'Mã OTP đã gửi về email của bạn'})
  otp: string;
}