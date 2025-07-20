import { Post } from "../entities/post.entitiy";

export interface ListPostsRepository {
    execute(): Promise<Post[] | null>
}