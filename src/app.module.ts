import { Module } from '@nestjs/common';
import { UserModule } from './presentation/http/user/user.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule { }
