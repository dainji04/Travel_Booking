import { IsString } from "class-validator";

export class OtpUserDto {
  @IsString()
  email: string;
  @IsString()
  otp: string;
}