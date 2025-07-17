import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UserRepositoryImpl } from '@infra/database/repositories/user/user.repository.impl';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { AuthModule } from '@interface/http/auth/modules/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepositoryImpl,
  ]
})
export class UserModule { }
