import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PaymentDocument = HydratedDocument<Payment>

@Schema({versionKey: false})
export class Payment {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Subject" })
    student_id: mongoose.Types.ObjectId;
 
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Teacher" })
    group_id: mongoose.Types.ObjectId;

    @Prop({required: true})
    payment: number;

    @Prop({required: true})
    payment_type: string;

    @Prop({required: true})
    payment_date: Date;

    @Prop({required: true})
    admin_id: mongoose.Types.ObjectId;
}


export const PaymentSchema = SchemaFactory.createForClass(Payment);