import { Module } from '@nestjs/common';
import { FavoriteController } from '../controllers/favorite.controller';
import { AuthModule } from '@interface/http/auth/modules/auth.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { FavoriteRepositoryImpl } from '@infra/database/repositories/favorite/favorite.repository.impl';
import { CreateFavoriteUseCase } from '@application/usecases/favorite/create-favorite.usecase';
import { DeleteFavoriteUseCase } from '@application/usecases/favorite/delete-favorite.usecase';
import { ListFavoritesUseCase } from '@application/usecases/favorite/list-favorites.usecase';

@Module({
  imports: [AuthModule],
  controllers: [FavoriteController],
  providers: [
    PrismaService,
    FavoriteRepositoryImpl,
    CreateFavoriteUseCase,
    DeleteFavoriteUseCase,
    ListFavoritesUseCase
  ]
})
export class FavoriteModule { }
