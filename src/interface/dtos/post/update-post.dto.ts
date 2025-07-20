import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({
        description: "Headline Post",
        example: "Videos about food"
    })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    headline: string

    @ApiProperty({
        description: "Content inside Post",
        example: "Hello everyone, my name is ..."
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
    user_id: number
}