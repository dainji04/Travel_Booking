import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/util/common/role_User.common';

export class UpdateUserDto  {

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
