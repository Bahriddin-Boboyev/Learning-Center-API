import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsPhoneNumber, IsIn } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example: "Najim", description: "admin's name"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "najim777@gmail.com", description: "admin's email address"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "+998931234567", description: "admin's phone number"})
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: "Uzbek!$t0n", description: "Password must be strong"})
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: "Uzbek!$t0n", description: "Password must be strong"})
    @IsStrongPassword()
    @IsNotEmpty()
    access_password: string;

    @ApiProperty({ example: 'admin,superAdmin', description: "admin's role" })
    @IsNotEmpty()
    @IsIn(['admin','superAdmin'])
    role: string;
}
 