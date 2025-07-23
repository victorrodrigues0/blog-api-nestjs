import { DeleteCommentDto } from "@interface/dtos/comment/delete-comment.dto";

export interface DeleteCommentRepository {
    execute(data: DeleteCommentDto): Promise<void | null>
}