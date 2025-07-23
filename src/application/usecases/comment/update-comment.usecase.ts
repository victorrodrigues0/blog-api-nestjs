import { Comment } from "@domain/comment/entities/comment.entity";
import { UpdateCommentRepository } from "@domain/comment/repositories/update-comment.repository";
import { CommentRepositoryImpl } from "@infra/database/repositories/comment/comment.repository.impl";
import { UpdateCommentDto } from "@interface/dtos/comment/update-comment.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateCommentUseCase implements UpdateCommentRepository {
    constructor(
        private readonly updateComment: CommentRepositoryImpl
    ) { }

    async execute(data: UpdateCommentDto): Promise<Comment | null> {
        try {
            return await this.updateComment.update(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}