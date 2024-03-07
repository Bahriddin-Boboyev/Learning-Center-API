import { HydratedDocument } from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

export type AdminDocument = HydratedDocument<Admin> 

@Schema({versionKey: false})
export class Admin {
    @Prop({required: true})
    name: string;
   
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    phone: string;

    @Prop({required: false})
    refresh_token: string;

    @Prop({ required: true, enum: ['admin', 'superAdmin'], default: 'admin'})
    role: string;

    @Prop({default: true})
    is_active: boolean;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);