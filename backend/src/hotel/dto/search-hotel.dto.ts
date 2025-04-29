import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchHotelDto {
    @ApiPropertyOptional({ description: 'Thành phố của khách sạn' })
    @IsOptional()
    city: string;
    @ApiPropertyOptional({ description: 'Sao của khách sạn' })
    @IsOptional()
    star: number;
    @ApiPropertyOptional({ description: 'Giá của khách sạn' })
    @IsOptional()
    price: number;
    @ApiPropertyOptional({ description: 'Tên của khách sạn' })
    @IsOptional()
    name: string;
    @ApiPropertyOptional({ description: 'Trang bao nhiêu' })
    @IsOptional()
    page: number;
    @ApiPropertyOptional({ description: 'Lấy bao nhiêu cái hotel' })
    @IsOptional()
    limit: number;
    @ApiPropertyOptional({ description: 'tìm kiếm theo ASC hay DESC' })
    @IsOptional()
    sort?:string

    @ApiPropertyOptional({ description: 'Địa chỉ của khách sạn' })
    @IsOptional()
    address:string
}