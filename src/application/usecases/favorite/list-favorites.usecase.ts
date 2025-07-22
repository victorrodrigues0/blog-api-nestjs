import { Favorite } from "@domain/favorite/entities/favorite.entity";
import { ListFavoritesRepository } from "@domain/favorite/repositories/list-favorites.repository";
import { FavoriteRepositoryImpl } from "@infra/database/repositories/favorite/favorite.repository.impl";
import { ListFavoriteDto } from "@interface/dtos/favorite/list-favorite.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListFavoritesUseCase implements ListFavoritesRepository {
    constructor(
        private readonly listFavorites: FavoriteRepositoryImpl
    ) { }

    async execute(data: ListFavoriteDto): Promise<Favorite[] | null> {
        try {
            return await this.listFavorites.list(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}