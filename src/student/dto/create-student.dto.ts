import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @ApiProperty({ example: "John Doe", description: "Student's full name" })
    @IsNotEmpty()
    @IsString()
    full_name: string;
    
    @ApiProperty({ example: "+99893123467", description: "Student's phone" })
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone_number: string;
    
    @ApiProperty({ example: "Doe Moe", description: "Student's parent's full name" })
    @IsNotEmpty()
    @IsString()
    parent_name: string;
    
    @ApiProperty({ example: "+998937456123", description: "Student's parent's phone number" })
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    parent_phone: string;
}
