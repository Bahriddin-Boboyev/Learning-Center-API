import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

export class UpdateAdminDto {
    @ApiProperty({example: "Najim", description: "admin's name"})
    @IsOptional()

    @IsString()
    @IsNotEmpty()
    name?: string;
    
    @ApiProperty({example: "+998931234567", description: "admin's phone number"})
    @IsOptional()
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone?: string;
    
    @ApiProperty({ example: 'admin,superAdmin', description: "admin's role" })
    @IsOptional()
    @IsNotEmpty()
    @IsIn(['admin', 'superAdmin'], { message: 'Invalid role' })
    role?: string;
}
