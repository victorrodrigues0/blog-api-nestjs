import { Post } from "@domain/post/entities/post.entitiy";
import { ListPostsRepository } from "@domain/post/repositories/list-posts.repository";
import { PostRepositoryImpl } from "@infra/database/repositories/post/post.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListPostsUseCase implements ListPostsRepository {
    
    constructor(
        private readonly listPost: PostRepositoryImpl 
    ) {}

    async execute(): Promise<Post[] | null> {
         try {
            return await this.listPost.listPosts();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}