import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginAdminDto {
    @ApiProperty({example: "johndoe@gmail.com", description: "Admin's email address"})
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({example: "Uzbek!$t0n", description: "Admin's password it will be Strong password"})
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}