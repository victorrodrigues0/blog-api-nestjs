import { Module } from '@nestjs/common';
import { PostController } from '../controllers/post.controller';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PostRepositoryImpl } from '@infra/database/repositories/post/post.repository.impl';
import { CreatePostUseCase } from '@application/usecases/post/create-post.usecase';
import { UpdatePostUseCase } from '@application/usecases/post/update-post.usecase';
import { ListPostsUseCase } from '@application/usecases/post/list-posts.usecase';
import { DeletePostUseCase } from '@application/usecases/post/delete-post.usecase';
import { AuthModule } from '@interface/http/auth/modules/auth.module';
import { GetPostByIdUseCase } from '@application/usecases/post/get-post-by-id.usecase';

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [
    PrismaService,
    PostRepositoryImpl,
    CreatePostUseCase,
    UpdatePostUseCase,
    ListPostsUseCase,
    DeletePostUseCase,
    GetPostByIdUseCase
  ]
})
export class PostModule { }
