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

                    const commentUpdate = await this.databaseService.comments.update({
                        where: {
                            id: data.comment_id
                        },
                        data: {
                            content: data.content
                        }
                    });

                    if (!commentUpdate) {
                        throw new BadRequestException("Error to update the comment in post.");
                    }

                    const response = new Comment('post', commentUpdate.content, commentUpdate.user_id);

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
                        }
                    });

                    if (!comments) {
                        throw new BadRequestException("Error to find the comments.");
                    }

                    const response = comments.map(comment => new Comment('post', comment.comment_rel.content, comment.comment_rel.user_id));

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