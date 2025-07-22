import { DeletePostRepository } from "@domain/post/repositories/delete-post.repository";
import { PostRepositoryImpl } from "@infra/database/repositories/post/post.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeletePostUseCase implements DeletePostRepository {

    constructor(
        private readonly deletePost: PostRepositoryImpl
    ) { }

    async execute(id: number): Promise<void | null> {
        try {
            return await this.deletePost.deletePost(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}