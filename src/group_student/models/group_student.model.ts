import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type GroupStudentDocument = HydratedDocument<GroupStudent>;
@Schema({versionKey:false})
export class GroupStudent {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Group" })
    group_id: mongoose.Types.ObjectId;
    
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Student" })
    student_id: mongoose.Types.ObjectId;
}

export const GroupStudentSchema = SchemaFactory.createForClass(GroupStudent);
 