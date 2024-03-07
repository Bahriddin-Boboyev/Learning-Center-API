import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class FindTeacherDto {
    @IsString()
    @IsOptional()
    full_name?: string;
    
    @IsOptional()
    @IsPhoneNumber()
    phone?: string;
}