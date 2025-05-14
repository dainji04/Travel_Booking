import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {


    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'1' , description:'ID của xe '})
    type:string

    @IsString()
    @ApiProperty({example:'adsasd.pdf',description:'Ảnh của xe'})
    avatar:string

    @IsNumber()
    @ApiProperty({example:'250.000VND',description:'Giá của xe'})
    price:number

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @ApiProperty({
      example: [1, 2, 3],
      description: 'Danh sách Tour ID của xe',
      type: [Number],
    })
    tourId: number[];
}
