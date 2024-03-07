import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateGroupDto {
    @ApiProperty({ example: "65421d42d049e892d5c4a63d", description: "Subject ID" })
    @IsMongoId()
    subject_id: Types.ObjectId;

    @ApiProperty({ example: "65421d42d049e892d5c4a63d", description: "Teacher ID" })
    @IsMongoId()
    teacher_id: Types.ObjectId;

    @ApiProperty({ example: "English", description: "Title for group" })
    @IsString()
    title: string;

    @ApiProperty({ example: "This group description", description: "Description for group" })
    @IsString()
    description: string;
    
    @ApiProperty({ example: "2023-11-01", description: "Group's start time" })
    @IsDateString()
    start_time: Date;

    @ApiProperty({ example: 250000, description: "How much for month" })
    @IsString()
    payment_month: number;
}
