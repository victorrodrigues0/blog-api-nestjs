import { Module } from '@nestjs/common';
import { UserModule } from './interface/http/user/modules/user.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './interface/http/auth/modules/auth.module';
import { PostModule } from './interface/http/post/modules/post.module';
import { FavoriteModule } from './interface/http/favorite/modules/favorite.module';
import { CommentModule } from './interface/http/comment/modules/comment.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, PostModule, FavoriteModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
