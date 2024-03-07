import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class OtpAccess {
    @ApiProperty({example: "+998931234567", description: "admin's phone number"})
    @IsPhoneNumber('UZ')
    phone: string;
    
    @ApiProperty({example: "1234", description: "SMS message "})
    @IsString()
    otp: string;
}