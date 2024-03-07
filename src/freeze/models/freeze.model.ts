import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type  FreezeDocument = HydratedDocument<Freeze>

@Schema({versionKey: false})
export class Freeze {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
    student_id: mongoose.Types.ObjectId;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Group'})
    group_id: mongoose.Types.ObjectId;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    start_time: Date;

    @Prop({required: true})
    end_time: Date;
}

export const FreezeSchema = SchemaFactory.createForClass(Freeze);
