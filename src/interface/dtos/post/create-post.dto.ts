import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        description: "Headline Post",
        example: "How to code"
    })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    headline: string

    @ApiProperty({
        description: "Content inside Post",
        example: "Today will see how ..."
    })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    content: string

    @ApiProperty({
        description: "User id Relational",
        example: 12
    })
    @IsNotEmpty()
    @IsInt()
    @Length(1)
    @IsOptional()
    user_id: number
}