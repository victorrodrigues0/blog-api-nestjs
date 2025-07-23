import { CreateCommentRepository } from "@domain/comment/repositories/create-comment.repository";
import { CommentRepositoryImpl } from "@infra/database/repositories/comment/comment.repository.impl";
import { CreateCommentDto } from "@interface/dtos/comment/create-comment.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateCommentUseCase implements CreateCommentRepository {
    constructor(
        private readonly createComment: CommentRepositoryImpl
    ) { }

    async execute(data: CreateCommentDto): Promise<void | null> {
        try {
            return await this.createComment.create(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}