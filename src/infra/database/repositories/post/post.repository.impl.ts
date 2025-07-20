import { Post } from "@domain/post/entities/post.entitiy";
import { PostRepository } from "@domain/post/repositories/post.repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { CreatePostDto } from "@interface/dtos/post/create-post.dto";
import { UpdatePostDto } from "@interface/dtos/post/update-post.dto";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class PostRepositoryImpl implements PostRepository {

    constructor(
        private readonly databaseService: PrismaService
    ) { }

    async createPost(data: CreatePostDto): Promise<void | null> {
        try {
            const response = await this.databaseService.posts.create({ data });

            if (!response) {
                throw new BadRequestException("Error to create post.");
            }

            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async listPosts(): Promise<Post[] | null> {
        try {
            const posts = await this.databaseService.posts.findMany();

            if (!posts) {
                throw new BadRequestException("Error to get posts.");
            }

            const response = posts.map(post => new Post(post.id, post.headline, post.content, post.user_id));

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updatePost(id: number, data: UpdatePostDto): Promise<Post | null> {
        try {
            const post = await this.databaseService.posts.update({ where: { id }, data });

            if (!post) {
                throw new BadRequestException("Error to update post.");
            }

            const response = new Post(post.id, post.headline, post.content, post.user_id);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deletePost(id: number): Promise<void | null> {
        try {
            const response = await this.databaseService.posts.delete({ where: { id } });

            if (!response) {
                throw new BadRequestException("Error to delete post.");
            }

            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deletePosts(ids: number[]): Promise<void | null> {
        try {

            const response = ids.map(async (id, idx) => {
                await this.databaseService.posts.delete({ where: { id } });
            });

            if (!response) {
                throw new BadRequestException("Error to delete posts.");
            }

            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: number): Promise<Post | null> {
        try {
            const post = await this.databaseService.posts.findUnique({ where: { id } });

            if (!post) {
                throw new BadRequestException("Error to get post.");
            }

            const response = new Post(post.id, post.headline, post.content, post.user_id);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}