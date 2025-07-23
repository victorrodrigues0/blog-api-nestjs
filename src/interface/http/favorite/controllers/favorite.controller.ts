import { CreateFavoriteUseCase } from '@application/usecases/favorite/create-favorite.usecase';
import { DeleteFavoriteUseCase } from '@application/usecases/favorite/delete-favorite.usecase';
import { ListFavoritesUseCase } from '@application/usecases/favorite/list-favorites.usecase';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Favoritos | favorites")
@Controller('favorites')
export class FavoriteController {

    constructor(
        private readonly createFavorite: CreateFavoriteUseCase,
        private readonly deleteFavorite: DeleteFavoriteUseCase,
        private readonly listFavorite: ListFavoritesUseCase
    ) { }

    @ApiOperation({ summary: "Adiciona um favorito em um recurso no sistema." })
    @ApiResponse({ status: 201, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
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

    @ApiOperation({ summary: "Deleta o favorito em um recurso do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
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

    @ApiOperation({ summary: "Lista todos os favoritos de um determinado recurso do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
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
