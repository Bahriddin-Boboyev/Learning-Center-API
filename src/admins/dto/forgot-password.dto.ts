import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class ForgotPassword {
    @ApiProperty({example: "+998931234567", description: "admin's phone number"})
    @IsPhoneNumber('UZ')
    phone: string;
}