import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsString, Length, } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: "Nome do usuário", example: "Jonh Doe" })
    @IsEmpty()
    @IsString()
    name: string

    @ApiProperty({ description: "Email do usuário", example: "example@gmail.com" })
    @IsEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ description: "Senha do usuário", example: "JonhDoe123" })
    @IsEmpty()
    @IsString()
    @Length(0, 100)
    password: string
}