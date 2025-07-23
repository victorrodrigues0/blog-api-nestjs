import { Comment } from "../entities/comment.entity";

export interface ListCommentsRepository {
    execute(resource: string): Promise<Comment[] | null>
}