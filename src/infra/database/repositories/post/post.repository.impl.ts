import { Post } from "@domain/post/entities/post.entitiy";
import { PostRepository } from "@domain/post/repositories/post.repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { CreatePostDto } from "@interface/dtos/post/create-post.dto";
import { UpdatePostDto } from "@interface/dtos/post/update-post.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { unlinkSync } from "fs";
@Injectable()
export class PostRepositoryImpl implements PostRepository {

    constructor(
        private readonly databaseService: PrismaService
    ) { }

    async createPost(data: CreatePostDto): Promise<void | null> {
        try {
            const response = await this.databaseService.posts.create({
                data: {
                    headline: data.headline,
                    content: data.content,
                    user_id: data.user_id
                }
            });

            if (!response) {
                throw new BadRequestException("Error to create post.");
            }

            if (data.images.length > 0) {
                data.images.forEach(async image => {
                    const verifyImage = await this.databaseService.post_images.create({
                        data: {
                            image,
                            post_id: response.id
                        }
                    })

                    if (!verifyImage) {
                        throw new BadRequestException("Error to register images");
                    }

                })
            }
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async listPosts(): Promise<Post[] | null> {
        try {
            const posts = await this.databaseService.posts.findMany({
                include: {
                    post_images: {
                        select: {
                            image: true
                        }
                    }
                }
            });

            if (!posts) {
                throw new BadRequestException("Error to get posts.");
            }

            const response = posts.map(post => new Post(post.id, post.headline, post.content, post.post_images, post.user_id));

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updatePost(id: number, data: UpdatePostDto): Promise<Post | null> {
        try {
            const post = await this.databaseService.posts.findUnique({
                where: { id },
                include: {
                    post_images: {
                        select: {
                            id: true,
                            image: true
                        }
                    }
                }
            });

            if (!post) {
                throw new BadRequestException("Post not found.");
            }

            if (post.user_id !== data.user_id) {
                throw new BadRequestException("User is different from the creator.");
            }

            const updatedPost = await this.databaseService.posts.update({
                where: { id },
                data: {
                    headline: data.headline,
                    content: data.content,
                    user_id: data.user_id
                }
            });

            if (!updatedPost) {
                throw new BadRequestException("Error to update post.");
            }

            if (data.images.length > 0) {

                if (post.post_images.length > 0) {
                    post.post_images.forEach(async image => {
                        const verifyDeleteImage = await this.databaseService.post_images.delete({
                            where: {
                                id: image.id
                            }
                        })

                        unlinkSync('./public/uploads/post/' + image.image)

                        if (!verifyDeleteImage) {
                            throw new BadRequestException("Error do delete images on post.");
                        }
                    })
                }

                data.images.forEach(async image => {
                    const verifyAddImage = await this.databaseService.post_images.create({
                        data: {
                            image: image,
                            post_id: id
                        }
                    })

                    if (!verifyAddImage) {
                        throw new BadRequestException("Error do update images on post.");
                    }
                })

            }

            const updatePostFind = await this.databaseService.posts.findUnique({
                where: {
                    id
                },
                include: {
                    post_images: {
                        select: {
                            image: true
                        }
                    }
                }
            });

            if (!updatePostFind) {
                throw new BadRequestException("Error to find the post for response");
            }

            const response = new Post(updatePostFind.id, updatePostFind.headline, updatePostFind.content, updatePostFind?.post_images, updatePostFind.user_id);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deletePost(id: number): Promise<void | null> {
        try {

            const post = await this.databaseService.posts.findUnique({
                where: { id },
                include: {
                    post_images: true
                }
            });

            if (!post) {
                throw new BadRequestException("Post not found.");
            }

            post.post_images.forEach(async image => {

                const verifyDeleteImage = await this.databaseService.post_images.delete({
                    where: {
                        id: image.id
                    }
                })

                if (!verifyDeleteImage) {
                    throw new BadRequestException("Error do delete images on post.");
                }

                unlinkSync('./public/uploads/post/' + image.image)
            })

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

    async getById(id: number): Promise<Post | null> {
        try {
            const post = await this.databaseService.posts.findUnique({
                where: { id },
                include: {
                    post_images: {
                        select: {
                            image: true
                        }
                    }
                }
            });

            if (!post) {
                throw new BadRequestException("Error to get post.");
            }

            const response = new Post(post.id, post.headline, post.content, post.post_images, post.user_id);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}