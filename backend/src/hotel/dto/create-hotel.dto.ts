import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsArray, IsUrl, Min, Max, IsNotEmpty } from "class-validator";

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

  @ApiPropertyOptional({ example: 5, description: "Số sao || Chọn từ 1 sao tới 5 sao " })
  @IsNumber()
  @Min(0)
  @Max(5)
  rate: number;

  @ApiPropertyOptional({ example: ["Gần biển", "Hồ bơi"], description: "Đặc điểm khách sạn" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

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

  @IsNotEmpty()
  @ApiPropertyOptional({ example: 1, description: "ID của địa điểm" })
  locationId: number;
}
