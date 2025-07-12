import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UserRepositoryImpl } from '@infra/database/repositories/user/user.repository.impl';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepositoryImpl,
  ]
})
export class UserModule { }
