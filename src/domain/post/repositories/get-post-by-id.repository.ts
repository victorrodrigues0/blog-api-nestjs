import { Post } from "../entities/post.entitiy";

export interface GetPostByIdRepository {
    execute(id: number): Promise<Post | null>
}