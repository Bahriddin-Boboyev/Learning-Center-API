import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type SubjectDocument = HydratedDocument<Subject> 
@Schema({versionKey: false})
export class Subject {
    @Prop({required: true})
    title: string;
   
    @Prop({required: true})
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }] })
    teachers: mongoose.Types.ObjectId[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
