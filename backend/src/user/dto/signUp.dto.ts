import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto{

    @IsString()
    @IsOptional()
    name:string;
    @IsEmail()
    email:string
    @IsNotEmpty()
    @IsString()
    password:string
}

//882060