import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class FindStudentDto {
    @IsString()
    @IsOptional()
    full_name?: string;
    
    @IsOptional()
    @IsPhoneNumber()
    phone_number?: string;
}