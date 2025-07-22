import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateCommentDto {
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
    content: string

    @ApiProperty({
        description: "User rel of comment"
    })
    @IsNotEmpty()
    @IsNumber()
    user_id: number

    @ApiProperty({
        description: "Resource rel of comment"
    })
    @IsNotEmpty()
    @IsNumber()
    resource_id: number
}