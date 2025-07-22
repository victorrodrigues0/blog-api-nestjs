import { Post } from "@domain/post/entities/post.entitiy";
import { GetPostByIdRepository } from "@domain/post/repositories/get-post-by-id.repository";
import { PostRepositoryImpl } from "@infra/database/repositories/post/post.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetPostByIdUseCase implements GetPostByIdRepository {
    constructor(
        private readonly getPostById: PostRepositoryImpl
    ) { }

    async execute(id: number): Promise<Post | null> {
        try {
            return await this.getPostById.getById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
} 