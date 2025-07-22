import { Favorite } from "@domain/favorite/entities/favorite.entity";
import { FavoriteRepository } from "@domain/favorite/repositories/favorite.repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { CreateFavoriteDto } from "@interface/dtos/favorite/create-favorite.dto";
import { DeleteFavoriteDto } from "@interface/dtos/favorite/delete-favorite.dto";
import { ListFavoriteDto } from "@interface/dtos/favorite/list-favorite.dto";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class FavoriteRepositoryImpl implements FavoriteRepository {
    constructor(
        private readonly databaseService: PrismaService
    ) { }

    async create(data: CreateFavoriteDto): Promise<void | null> {
        const postResource = "post";
        try {
            switch (data.resource) {
                case postResource:
                    const post = await this.databaseService.posts.findUnique({ where: { id: data.resource_id } });

                    if (!post) {
                        throw new BadRequestException("Post not found.");
                    }

                    const verifyFavorite = await this.databaseService.favorite_posts.findUnique({
                        where: {
                            resource_id_user_id: {
                                resource_id: data.resource_id,
                                user_id: data.user_id
                            }
                        }
                    })

                    if (verifyFavorite) {
                        throw new ConflictException("Favorite already exists.");
                    }

                    const response = await this.databaseService.favorite_posts.create({
                        data: {
                            resource_id: data.resource_id,
                            user_id: data.user_id
                        }
                    });

                    if (!response) {
                        throw new BadRequestException("Failed to create favorite.");
                    }

                    return;
                default:
                    throw new BadRequestException("Resource is invalid.")
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(data: DeleteFavoriteDto): Promise<void | null> {
        const postResource = 'post';
        try {
            switch (data.resource) {
                case postResource:
                    const post = await this.databaseService.posts.findUnique({ where: { id: data.resource_id } });

                    if (!post) {
                        throw new BadRequestException("Post not found.");
                    }

                    const favorite = await this.databaseService.favorite_posts.findUnique({
                        where: {
                            resource_id_user_id: {
                                resource_id: data.resource_id,
                                user_id: data.user_id
                            }
                        }
                    })

                    if (!favorite) {
                        throw new BadRequestException("Favorite not found.");
                    }

                    const response = await this.databaseService.favorite_posts.delete({
                        where: {
                            resource_id_user_id: {
                                resource_id: data.resource_id,
                                user_id: data.user_id
                            }
                        }
                    });

                    if (!response) {
                        throw new BadRequestException("Failed to delete favorite.");
                    }

                    return;
                default:
                    throw new BadRequestException("Resource is invalid.")
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async list(data: ListFavoriteDto): Promise<Favorite[] | null> {
        const postResource = 'post';

        try {
            switch (data.resource) {
                case postResource:
                    const posts = await this.databaseService.favorite_posts.findMany({
                        where: { user_id: data.user_id },
                        include: {
                            resource_rel: {
                                include: {
                                    user_rel: true
                                }
                            },
                            user_rel: true
                        }
                    })

                    if (!posts) {
                        throw new BadRequestException("Failed to get favorites.");
                    }
                    const response = posts.map(post =>
                        new Favorite(postResource, post.user_rel, post.resource_rel));

                    return response;
                default:
                    throw new BadRequestException("Resource is invalid.")
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}