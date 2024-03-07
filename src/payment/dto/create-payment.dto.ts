import { IsDateString, IsIn, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreatePaymentDto {

    @IsMongoId()
    @IsNotEmpty()
    student_id: mongoose.Types.ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    group_id: mongoose.Types.ObjectId;

    @IsNotEmpty()
    payment: number;

    @IsIn(['naqd', 'karta'])
    payment_type: string;

    @IsDateString()
    payment_date: Date;
}