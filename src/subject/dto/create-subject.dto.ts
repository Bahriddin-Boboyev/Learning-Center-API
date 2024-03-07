import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSubjectDto {
    @ApiProperty({example: "Ingliz tili", description: "subject name"})
    @IsString()
    title: string;
    
    @ApiProperty({example: "Ingliz tili darsligi boshlang'ich", description: "subject name"})
    @IsString()
    description: string;
}
