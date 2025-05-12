import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/util/common/role_User.common";

export class CreateUserDto {

    @ApiProperty({example:'Dai Den', description:'Username'})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:'daiden3101@gmail.com',description:'User email'})
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty({example:'daidenPassword',description:'User password'})
    @IsNotEmpty()
    password:string

    @ApiProperty({
        example: [Roles.USER],
        description: 'User roles',
        enum: Roles,
        isArray: true,
    })
    @IsNotEmpty()
    roles:Roles[]
    
}
