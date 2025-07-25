import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({
        description: "Headline Post",
        example: "Videos about food"
    })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    @IsOptional()
    headline: string

    @ApiProperty({
        description: "Content inside Post",
        example: "Hello everyone, my name is ..."
    })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    @IsOptional()
    content: string

    @ApiProperty({
        description: "Post images",
        example: ['img01.png', 'img02.png']
    })
    @IsOptional()
    @IsArray()
    images: string[]

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