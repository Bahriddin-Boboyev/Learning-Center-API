import { IsDateString, IsString } from "class-validator";

export class FindGroupDto {
    @IsString()
    title: string;
    
    @IsDateString()
    start_time: Date;
    
    @IsDateString()
    end_time: Date;
}