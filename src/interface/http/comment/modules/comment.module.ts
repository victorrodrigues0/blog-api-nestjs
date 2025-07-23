import { Module } from '@nestjs/common';
import { CommentController } from '../controllers/comment.controller';
import { AuthModule } from '@interface/http/auth/modules/auth.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { CommentRepositoryImpl } from '@infra/database/repositories/comment/comment.repository.impl';
import { CreateCommentUseCase } from '@application/usecases/comment/create-comment.usecase';
import { UpdateCommentUseCase } from '@application/usecases/comment/update-comment.usecase';
import { DeleteCommentUseCase } from '@application/usecases/comment/delete-comment.usecase';
import { ListCommentsUseCase } from '@application/usecases/comment/list-comments.usecase';

@Module({
  imports: [AuthModule],
  controllers: [CommentController],
  providers: [
    PrismaService,
    CommentRepositoryImpl,
    CreateCommentUseCase,
    UpdateCommentUseCase,
    DeleteCommentUseCase,
    ListCommentsUseCase
  ]
})
export class CommentModule {}
