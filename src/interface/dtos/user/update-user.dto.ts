import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ description: "User name.", example: "John Doe Roberts" })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({ description: "User email.", example: "JohnDoeRoberts@gmail.com" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsOptional()
    email: string

    @ApiProperty({ description: "User password.", example: "JohnDoeR123" })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @IsOptional()
    password: string
}
