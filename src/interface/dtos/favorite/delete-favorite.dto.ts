import { ResourcePermissions } from "@domain/favorite/enums/resource.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class DeleteFavoriteDto {
    @ApiProperty({
        description: "Resource to favorite.",
        example: "post"
    })
    @IsNotEmpty()
    @IsEnum(ResourcePermissions)
    resource: string

     @ApiProperty({
        description: "Resource id to favorite.",
        example: "12"
    })
    @IsNotEmpty()
    @IsNumber()
    resource_id: number

    @ApiProperty({
        description: "User id to favorite.",
        example: "1"
    })
    @IsNotEmpty()
    @IsNumber()
    user_id: number
}