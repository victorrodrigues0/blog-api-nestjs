import { DeleteFavoriteDto } from "@interface/dtos/favorite/delete-favorite.dto";

export interface DeleteFavoriteRepository {
    execute(data: DeleteFavoriteDto): Promise<void | null>
}