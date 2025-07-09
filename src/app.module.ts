import { Module } from '@nestjs/common';
import { UserModule } from './presentation/http/user/user.module';
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from './infra/database/prisma/prisma.service';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
