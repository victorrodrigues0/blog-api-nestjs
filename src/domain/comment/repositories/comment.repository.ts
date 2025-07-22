import { CreateCommentDto } from "@interface/dtos/comment/create-comment.dto";
import { UpdateCommentDto } from "@interface/dtos/comment/update-comment.dto";
import { Comment } from "../entities/comment.entity";
import { DeleteCommentDto } from "@interface/dtos/comment/delete-comment.dto";

export interface CommentRepository {
    create(data: CreateCommentDto): Promise<void | null>
    update(data: UpdateCommentDto): Promise<Comment | null>
    delete(data: DeleteCommentDto): Promise<void | null>
    list(resource: string): Promise<Comment[] | null>
}