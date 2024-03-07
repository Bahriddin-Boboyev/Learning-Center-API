import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsMongoId, IsDateString, IsIn } from "class-validator";
import { Types } from "mongoose";

export class CreateTeacherDto {
    @ApiProperty({ example: "Ingliz tili", description: "Teacher's full name" })
    @IsString()
    full_name: string;

    @ApiProperty({ example: "Phone number", description: "Teacher's phone number" })
    @IsString()
    phone: string;

    @ApiProperty({ example: "Subject ID", description: "Subject ID" })
    @IsMongoId()
    subject_id: Types.ObjectId;

    @ApiProperty({ example: "Teacher's role", description: "Teacher's role" })
    @IsString()
    @IsIn(['main','assistant'])
    role: string;

    @ApiProperty({ example: "Start time", description: "Teacher's start time" })
    @IsDateString()
    start_time: Date;
}
