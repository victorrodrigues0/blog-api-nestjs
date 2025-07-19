import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UserRepositoryImpl } from '@infra/database/repositories/user/user.repository.impl';
import { AuthModule } from '@interface/http/auth/modules/auth.module';
import { ListUserUseCase } from '@application/usecases/user/list-user.usecase';
import { DeleteUserUseCase } from '@application/usecases/user/delete-user.usecase';
import { UpdateUserUseCase } from '@application/usecases/user/update-user.usecase';
import { GetUserByIdUseCase } from '@application/usecases/user/get-user-by-id.usecase';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepositoryImpl,
    ListUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    GetUserByIdUseCase
  ]
})
export class UserModule { }
