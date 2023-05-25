import {Length, IsEmail} from '@nestjs/class-validator'
export class CreateUserDto {
   
    @Length(3, 255)
    first_name:string;

    @Length(3, 255)
    last_name:string;

    @Length(3, 255)
    @IsEmail()
    email:string;

}
