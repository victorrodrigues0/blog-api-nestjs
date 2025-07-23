import { CreateCommentUseCase } from '@application/usecases/comment/create-comment.usecase';
import { DeleteCommentUseCase } from '@application/usecases/comment/delete-comment.usecase';
import { ListCommentsUseCase } from '@application/usecases/comment/list-comments.usecase';
import { UpdateCommentUseCase } from '@application/usecases/comment/update-comment.usecase';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comentários | comments')
@Controller('comments')
export class CommentController {

    constructor(
        private readonly createComment: CreateCommentUseCase,
        private readonly updateComment: UpdateCommentUseCase,
        private readonly deleteComment: DeleteCommentUseCase,
        private readonly listComments: ListCommentsUseCase
    ) { }

    @ApiOperation({ summary: "Cria um comentário em um recurso do sistema." })
    @ApiResponse({ status: 201, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Post('create/:resource/:resource_id')
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Param('resource') resource: string,
        @Param('resource_id', new ParseIntPipe()) resource_id: number,
        @Body() body: { content: string },
        @Req() req: Request
    ) {
        const user = req['user'];

        if (!body) {
            throw new BadRequestException("Body is require.");
        }

        const data = {
            resource,
            content: body.content,
            user_id: user['id'],
            resource_id
        }

        return await this.createComment.execute(data);

    }

    @ApiOperation({ summary: "Atualiza um comentário em um recurso do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Put('update/:resource/:comment_id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('resource') resource: string,
        @Param('comment_id', new ParseIntPipe()) comment_id: number,
        @Body() body: { content: string },
        @Req() req: Request
    ) {
        const user = req['user'];

        if (!body) {
            throw new BadRequestException("Body is require.");
        }

        const data = {
            resource,
            content: body.content,
            comment_id,
            user_id: user['id']
        }

        return this.updateComment.execute(data);

    }

    @ApiOperation({ summary: "Deleta um comentário em um recurso do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Delete('delete/:resource/:resource_id/:comment_id')
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('resource') resource: string,
        @Param('resource_id', new ParseIntPipe()) resource_id: number,
        @Param('comment_id', new ParseIntPipe()) comment_id: number,
        @Req() req: Request
    ) {
        const user = req['user'];

        const data = {
            resource,
            user_id: user['id'],
            resource_id,
            comment_id
        }

        return this.deleteComment.execute(data);
    }

    @ApiOperation({ summary: "Lista os comentário de um recurso do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @Get('/:resource')
    @HttpCode(HttpStatus.OK)
    async list(
        @Param('resource') resource: string
    ) {
        return this.listComments.execute(resource);
    }
}
