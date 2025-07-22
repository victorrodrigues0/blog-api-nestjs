import { DeleteFavoriteRepository } from "@domain/favorite/repositories/delete-favorite.repository";
import { FavoriteRepositoryImpl } from "@infra/database/repositories/favorite/favorite.repository.impl";
import { DeleteFavoriteDto } from "@interface/dtos/favorite/delete-favorite.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteFavoriteUseCase implements DeleteFavoriteRepository {

    constructor(
        private readonly deleteFavorite: FavoriteRepositoryImpl
    ) { }

    async execute(data: DeleteFavoriteDto): Promise<void | null> {
        try {
            return await this.deleteFavorite.delete(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}