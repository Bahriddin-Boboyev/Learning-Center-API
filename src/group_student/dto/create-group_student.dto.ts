import { IsMongoId } from "class-validator";
import mongoose from "mongoose";

export class CreateGroupStudentDto {
    @IsMongoId()
    group_id: mongoose.Schema.Types.ObjectId;
    @IsMongoId()
    student_id: mongoose.Schema.Types.ObjectId;

}
