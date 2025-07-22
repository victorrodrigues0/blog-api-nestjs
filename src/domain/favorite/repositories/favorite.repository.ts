import { CreateFavoriteDto } from "@interface/dtos/favorite/create-favorite.dto";
import { DeleteFavoriteDto } from "@interface/dtos/favorite/delete-favorite.dto";
import { Favorite } from "../entities/favorite.entity";
import { ListFavoriteDto } from "@interface/dtos/favorite/list-favorite.dto";

export interface FavoriteRepository {
    create(data: CreateFavoriteDto): Promise<void | null>,
    delete(data: DeleteFavoriteDto): Promise<void | null>,
    list(data: ListFavoriteDto): Promise<Favorite[] | null>
}