import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignInDto {
    @ApiProperty({ description: "User email.", example: "JohnDoe@gmail.com" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ description: "User password.", example: "JohnDoe123" })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}