import { ResourcePermissions } from "@domain/favorite/enums/resource.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class ListFavoriteDto {
    @ApiProperty({
        description: "Resource to list the favorite.",
        example: "post"
    })
    @IsNotEmpty()
    @IsEnum(ResourcePermissions)
    resource: string

    @ApiProperty({
        description: "User id to list the favorite.",
        example: "1"
    })
    @IsNotEmpty()
    @IsNumber()
    user_id: number
}