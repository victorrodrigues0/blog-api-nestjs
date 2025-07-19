import { Module } from '@nestjs/common';
import { UserModule } from './interface/http/user/modules/user.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './interface/http/auth/modules/auth.module';
import { PostModule } from './interface/http/post/modules/post.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
