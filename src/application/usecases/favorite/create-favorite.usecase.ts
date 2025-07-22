import { CreateFavoriteRepository } from "@domain/favorite/repositories/create-favorite.repository";
import { FavoriteRepositoryImpl } from "@infra/database/repositories/favorite/favorite.repository.impl";
import { CreateFavoriteDto } from "@interface/dtos/favorite/create-favorite.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateFavoriteUseCase implements CreateFavoriteRepository {
    constructor(
        private readonly createFavorite: FavoriteRepositoryImpl
    ) { }

    async execute(data: CreateFavoriteDto): Promise<void | null> {
        try {
            return await this.createFavorite.create(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}