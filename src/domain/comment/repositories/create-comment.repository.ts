import { CreateCommentDto } from "@interface/dtos/comment/create-comment.dto";

export interface CreateCommentRepository {
    execute(data: CreateCommentDto): Promise<void | null>
}