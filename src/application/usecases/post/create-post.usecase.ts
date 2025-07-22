import { CreatePostRepository } from "@domain/post/repositories/create-post.repository";
import { PostRepositoryImpl } from "@infra/database/repositories/post/post.repository.impl";
import { CreatePostDto } from "@interface/dtos/post/create-post.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreatePostUseCase implements CreatePostRepository {

    constructor(
        private readonly createPost: PostRepositoryImpl
    ) { }

    async execute(data: CreatePostDto): Promise<void | null> {
        try {
            return await this.createPost.createPost(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
} 