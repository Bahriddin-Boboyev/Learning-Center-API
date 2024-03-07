import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type GroupDocument = HydratedDocument<Group>;

@Schema({versionKey: false})
export class Group {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Subject" })
    subject_id: mongoose.Types.ObjectId;
 
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Teacher" })
    teacher_id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    payment_month: number;

    @Prop({ required: true })
    start_time: Date;

}
export const GroupSchema = SchemaFactory.createForClass(Group);
