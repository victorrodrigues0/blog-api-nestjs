import { CreatePostDto } from "@interface/dtos/post/create-post.dto";
import { Post } from "../entities/post.entitiy";
import { UpdatePostDto } from "@interface/dtos/post/update-post.dto";

export interface PostRepository {
    createPost(data: CreatePostDto): Promise<void | null>,
    listPosts(): Promise<Post[] | null>,
    updatePost(id: number, data: UpdatePostDto): Promise<Post | null>,
    deletePost(id: number): Promise<void | null>,
    getById(id: number): Promise<Post | null>
}