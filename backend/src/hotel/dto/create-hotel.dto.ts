import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsArray, IsUrl } from "class-validator";

export class CreateHotelDto {
  @ApiPropertyOptional({ example: "BLTAT Hotel", description: "Tên của khách sạn" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: "http://localhost:3000/uploads/avatar.jpg", description: "Ảnh đại diện" })
  @IsOptional()
//   @IsUrl()
  avatar?: string;

  @ApiPropertyOptional({ example: "http://localhost:3000/uploads/detail.jpg", description: "Ảnh chi tiết" })
  @IsString()
  detail_avatar: string;

  @ApiPropertyOptional({ example: 5, description: "Số sao" })
  @IsNumber()
  star: number;

  @ApiPropertyOptional({ example: ["Gần biển", "Hồ bơi"], description: "Đặc điểm khách sạn" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  feature?: string[];

  @ApiPropertyOptional({ example: "Thành phố Hồ Chí Minh", description: "Thành phố" })
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: "Quận 1", description: "Địa chỉ" })
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 5000000, description: "Giá" })
  @IsOptional()
  @IsNumber()
  price?: number;
}
