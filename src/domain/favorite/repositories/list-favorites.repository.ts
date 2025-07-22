import { ListFavoriteDto } from "@interface/dtos/favorite/list-favorite.dto";
import { Favorite } from "../entities/favorite.entity";

export interface ListFavoritesRepository {
    execute(data: ListFavoriteDto): Promise<Favorite[] | null>
}