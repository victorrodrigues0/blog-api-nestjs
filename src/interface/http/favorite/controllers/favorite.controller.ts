import { CreateFavoriteUseCase } from '@application/usecases/favorite/create-favorite.usecase';
import { DeleteFavoriteUseCase } from '@application/usecases/favorite/delete-favorite.usecase';
import { ListFavoritesUseCase } from '@application/usecases/favorite/list-favorites.usecase';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';

@Controller('favorites')
export class FavoriteController {

    constructor(
        private readonly createFavorite: CreateFavoriteUseCase,
        private readonly deleteFavorite: DeleteFavoriteUseCase,
        private readonly listFavorite: ListFavoritesUseCase
    ) { }

    @UseGuards(AuthGuard)
    @Post("/create/:resource/:id")
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Param('resource') resource: string,
        @Param('id', new ParseIntPipe()) resource_id: number,
        @Req() req: Request
    ) {
        const user = req['user'];

        const data = {
            resource,
            resource_id,
            user_id: user['id']
        }

        return await this.createFavorite.execute(data);
    }

    @UseGuards(AuthGuard)
    @Delete("/delete/:resource/:id")
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('resource') resource: string,
        @Param('id', new ParseIntPipe()) resource_id: number,
        @Req() req: Request
    ) {
        const user = req['user'];

        const data = {
            resource,
            resource_id,
            user_id: user['id']
        }

        return await this.deleteFavorite.execute(data);
    }

    @UseGuards(AuthGuard)
    @Get("/:resource")
    @HttpCode(HttpStatus.OK)
    async list(
        @Param('resource') resource: string,
        @Req() req: Request
    ) {
        const user = req['user'];

        const data = {
            resource,
            user_id: user['id']
        }

        return await this.listFavorite.execute(data);
    }

}
