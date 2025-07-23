import { Comment } from "@domain/comment/entities/comment.entity";
import { ListCommentsRepository } from "@domain/comment/repositories/list-commments.repository";
import { CommentRepositoryImpl } from "@infra/database/repositories/comment/comment.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListCommentsUseCase implements ListCommentsRepository {
    constructor(
        private readonly listComments: CommentRepositoryImpl
    ) { }

    async execute(resource: string): Promise<Comment[] | null> {
        try {
            return await this.listComments.list(resource);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}