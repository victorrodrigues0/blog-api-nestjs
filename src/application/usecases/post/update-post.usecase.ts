import { Post } from "@domain/post/entities/post.entitiy";
import { UpdatePostRepository } from "@domain/post/repositories/update-post.repository";
import { PostRepositoryImpl } from "@infra/database/repositories/post/post.repository.impl";
import { UpdatePostDto } from "@interface/dtos/post/update-post.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdatePostUseCase implements UpdatePostRepository {
    constructor(
        private readonly updatePost: PostRepositoryImpl
    ) { }

    async execute(id: number, data: UpdatePostDto): Promise<Post | null> {
        try {
            return await this.updatePost.updatePost(id, data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}