import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    thumbail:string


    @IsNotEmpty()
    @IsString()
    cover_img:string

    @IsNotEmpty()
    @IsString()
    content:string

    @IsNumber()
    tourId:number
    
}
