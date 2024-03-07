import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {  HydratedDocument } from "mongoose";

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({versionKey: false})
export class Teacher {
    @Prop({ required: true })
    full_name: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Subject" })
    subject_id: mongoose.Types.ObjectId;

    @Prop({ required: true, enum: ['main', 'assistant'] })
    role: string;

    @Prop({ required: true })
    start_time: Date;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
