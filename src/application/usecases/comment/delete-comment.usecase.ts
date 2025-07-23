import { DeleteCommentRepository } from "@domain/comment/repositories/delete-comment.repository";
import { CommentRepositoryImpl } from "@infra/database/repositories/comment/comment.repository.impl";
import { DeleteCommentDto } from "@interface/dtos/comment/delete-comment.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteCommentUseCase implements DeleteCommentRepository {
    constructor(
        private readonly deleteComment: CommentRepositoryImpl
    ) { }

    async execute(data: DeleteCommentDto): Promise<void | null> {
        try {
            return await this.deleteComment.delete(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}