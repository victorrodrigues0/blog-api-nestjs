import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ description: "User name.", example: "John Doe" })
    @IsNotEmpty()
    @IsString()
    name: string

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
    
    @ApiProperty({ description: "User image.", example: "JohnDoe.png" })
    @IsString()
    @IsOptional()
    image: string

}
