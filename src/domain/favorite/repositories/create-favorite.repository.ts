import { CreateFavoriteDto } from "@interface/dtos/favorite/create-favorite.dto";

export interface CreateFavoriteRepository {
    execute(data: CreateFavoriteDto): Promise<void | null>
}