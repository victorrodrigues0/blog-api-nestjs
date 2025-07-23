import { UpdateCommentDto } from "@interface/dtos/comment/update-comment.dto";
import { Comment } from "../entities/comment.entity";

export interface UpdateCommentRepository {
    execute(data: UpdateCommentDto): Promise<Comment | null>
}