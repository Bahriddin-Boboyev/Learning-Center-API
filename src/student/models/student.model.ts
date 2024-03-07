import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StudentDocument = HydratedDocument<Student>;

@Schema({versionKey:false})
export class Student {
    @Prop({ required: true })
    full_name: string;

    @Prop({ required: true })
    phone_number: string;

    @Prop({ required: true })
    parent_name: string;

    @Prop({ required: true })
    parent_phone: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);