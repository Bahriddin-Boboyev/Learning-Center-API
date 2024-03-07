import { IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateAttendanceDto {
    @IsMongoId()
    @IsNotEmpty()
    student_id: mongoose.Types.ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    group_id: mongoose.Types.ObjectId;

    @IsBoolean()
    is_here: boolean;
}
