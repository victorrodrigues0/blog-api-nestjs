import { CreatePostDto } from "@interface/dtos/post/create-post.dto";

export interface CreatePostRepository {
    execute(data: CreatePostDto): Promise<void | null>
}