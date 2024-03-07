import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type AttendanceDocument = HydratedDocument<Attendance>

@Schema({versionKey: false})
export class Attendance {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Subject" })
    student_id: mongoose.Types.ObjectId;
 
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Teacher" })
    group_id: mongoose.Types.ObjectId;

    @Prop({required: true})
    is_here: boolean;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
