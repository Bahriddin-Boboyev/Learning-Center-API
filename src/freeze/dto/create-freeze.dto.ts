import { IsDateString, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateFreezeDto {
    @IsMongoId()
    @IsNotEmpty()
    student_id: mongoose.Types.ObjectId;
    
    @IsMongoId()
    @IsNotEmpty()
    group_id: mongoose.Types.ObjectId;
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    start_time: Date;
    
    @IsDateString()
    @IsNotEmpty()
    end_time: Date;
}
