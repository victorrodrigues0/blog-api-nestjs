import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { SignUpUseCase } from '@application/usecases/auth/sign-up.usecase';
import { AuthRepositoryImpl } from '@infra/database/repositories/auth/auth.repository.impl';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    PrismaService,
    SignUpUseCase,
    AuthRepositoryImpl
  ]
})
export class AuthModule { }
