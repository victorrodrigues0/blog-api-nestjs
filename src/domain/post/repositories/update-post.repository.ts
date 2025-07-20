import { UpdatePostDto } from "@interface/dtos/post/update-post.dto";
import { Post } from "../entities/post.entitiy";

export interface UpdatePostRepository {
    execute(id: number, data: UpdatePostDto): Promise<Post | null>
}