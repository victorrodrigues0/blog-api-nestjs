import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class UpdateCommentDto {
    @ApiProperty({
        description: "Type of comment"
    })
    @IsNotEmpty()
    @IsString()
    resource: string

    @ApiProperty({
        description: "Content of comment"
    })
    @IsNotEmpty()
    @IsString()
    @Length(2)
    @IsOptional()
    content: string

    @ApiProperty({
        description: "Comment identify"
    })
    @IsNotEmpty()
    @IsNumber()
    comment_id: number

    @ApiProperty({
        description: "User identify"
    })
    @IsNotEmpty()
    @IsNumber()
    user_id: number
}