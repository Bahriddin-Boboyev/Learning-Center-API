import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class UpdatePass {

    @ApiProperty({example: "Uzbek!$t0n", description: "Password must be strong"})
    @IsStrongPassword()
    @IsNotEmpty()
    old_password: string;

    @ApiProperty({example: "Uzbek!$t0n", description: "Password must be strong"})
    @IsStrongPassword()
    @IsNotEmpty()
    new_password: string;
}