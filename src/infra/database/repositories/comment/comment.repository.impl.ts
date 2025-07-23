import { Comment } from "@domain/comment/entities/comment.entity";
import { CommentRepository } from "@domain/comment/repositories/comment.repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { CreateCommentDto } from "@interface/dtos/comment/create-comment.dto";
import { DeleteCommentDto } from "@interface/dtos/comment/delete-comment.dto";
import { UpdateCommentDto } from "@interface/dtos/comment/update-comment.dto";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
    constructor(
        private readonly databaseService: PrismaService
    ) { }

    async create(data: CreateCommentDto): Promise<void | null> {
        const postResource = 'post';
        try {
            switch (data.resource) {
                case postResource:

                    const post = await this.databaseService.posts.findUnique({
                        where: {
                            id: data.resource_id
                        }
                    });

                    if (!post) {
                        throw new BadRequestException("Post not exists.");
                    }

                    const comment = await this.databaseService.comments.create({
                        data: {
                            content: data.content,
                            user_id: data.user_id
                        }
                    });

                    if (!comment) {
                        throw new BadRequestException("Error to register the comment.");
                    }

                    const commentPost = await this.databaseService.comment_posts.create({
                        data: {
                            comment_id: comment.id,
                            post_id: data.resource_id
                        }
                    });

                    if (!commentPost) {
                        throw new BadRequestException("Error to register the comment in post.");
                    }

                    return;
                default:
                    throw new BadRequestException("Resource is invalid.")
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(data: UpdateCommentDto): Promise<Comment | null> {
        const postResource = 'post';
        try {
            switch (data.resource) {
                case postResource:
                    const comment = await this.databaseService.comments.findUnique({
                        where: {
                            id: data.comment_id
                        }
                    });

                    if (!comment) {
                        throw new BadRequestException("Error to find the comment.");
                    }

                    if (data.user_id !== comment.user_id) {
                        throw new BadRequestException("User is not the post creator.");
                    }

                    const commentUpdate = await this.databaseService.comments.update({
                        where: {
                            id: data.comment_id
                        },
                        data: {
                            content: data.content
                        },
                        include: {
                            comment_posts: {
                                include: {
                                    post_rel: true
                                }
                            },
                            user_rel: {
                                omit: {
                                    password: true
                                }
                            }
                        }
                    });

                    if (!commentUpdate) {
                        throw new BadRequestException("Error to update the comment in post.");
                    }

                    const response = new Comment('post', comment.id, commentUpdate.content, commentUpdate.comment_posts, commentUpdate.user_rel);

                    return response;
                default:
                    throw new BadRequestException("Resource is invalid.")
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(data: DeleteCommentDto): Promise<void | null> {
        const postResource = 'post';
        try {
            switch (data.resource) {
                case postResource:
                    const comment = await this.databaseService.comments.findUnique({
                        where: {
                            id: data.comment_id
                        }
                    });

                    if (!comment) {
                        throw new BadRequestException("Error to find the comment.");
                    }

                    const verifyComment = await this.databaseService.comment_posts.findUnique({
                        where: {
                            comment_id_post_id: {
                                comment_id: comment.id,
                                post_id: data.resource_id
                            }
                        }
                    });

                    if (!verifyComment) {
                        throw new BadRequestException("Comment not exists");
                    }

                    const commentPostDelete = await this.databaseService.comment_posts.delete({
                        where: {
                            comment_id_post_id: {
                                post_id: data.resource_id,
                                comment_id: comment.id
                            }
                        }
                    });

                    if (!commentPostDelete) {
                        throw new BadRequestException("Error to delete the comment in post.");
                    }

                    const commentDelete = await this.databaseService.comments.delete({
                        where: {
                            id: data.comment_id
                        }
                    });

                    if (!commentDelete) {
                        throw new BadRequestException("Error to delete the comment.");
                    }


                    return;
                default:
                    throw new BadRequestException("Resource is invalid.")
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async list(resource: string): Promise<Comment[] | null> {
        const postResource = 'post';
        try {
            switch (resource) {
                case postResource:
                    const comments = await this.databaseService.comment_posts.findMany({
                        include: {
                            comment_rel: true,
                            post_rel: {
                                include: {
                                    user_rel: {
                                        omit: {
                                            password: true
                                        }
                                    }
                                }
                            }
                        }
                    });

                    if (!comments) {
                        throw new BadRequestException("Error to find the comments.");
                    }

                    const response = comments.map(comment => new Comment('post', comment.comment_id, comment.comment_rel.content, comment.post_rel, comment.post_rel.user_rel));

                    return response;
                default:
                    throw new BadRequestException("Resource is invalid.")
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}