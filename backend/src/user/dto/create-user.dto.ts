import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/common/role_User.common";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

    @IsNotEmpty()
    roles:Roles[]
    
}
