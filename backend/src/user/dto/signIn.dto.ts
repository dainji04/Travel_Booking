import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string
    @IsNotEmpty()
    password:string
}