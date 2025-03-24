import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDto {
        @ApiProperty({example:'daiden3101@gmail.com',description:'User email'})
        @IsNotEmpty()
        @IsEmail()
        email:string
    
        @ApiProperty({example:'daidenPassword',description:'User password'})
        @IsNotEmpty()
        password:string
}