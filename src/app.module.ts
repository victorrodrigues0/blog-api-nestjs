import { Module } from '@nestjs/common';
import { UserModule } from './interface/http/user/modules/user.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './interface/http/auth/modules/auth.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
