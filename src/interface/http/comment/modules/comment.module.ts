import { Module } from '@nestjs/common';
import { CommentController } from '../controllers/comment.controller';
import { AuthModule } from '@interface/http/auth/modules/auth.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [CommentController],
  providers: [
    PrismaService
  ]
})
export class CommentModule {}
