import { Post } from "@domain/post/entities/post.entitiy";
import { PostRepository } from "@domain/post/repositories/post.repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { CreatePostDto } from "@interface/dtos/post/create-post.dto";
import { UpdatePostDto } from "@interface/dtos/post/update-post.dto";

export class PostRepositoryImpl implements PostRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    createPost(data: CreatePostDto): Promise<void | null> {

    }

    listPosts(): Promise<Post[] | null> {

    }

    updatePost(id: number, data: UpdatePostDto): Promise<Post | null> {

    }

    deletePost(id: number): Promise<void | null> {

    }

    getById(id: number): Promise<Post | null> {

    }

    getByUserName(name: string): Promise<Post | Post[] | null> {

    }


}