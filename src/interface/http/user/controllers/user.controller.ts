import { DeleteUserUseCase } from '@application/usecases/user/delete-user.usecase';
import { GetUserByIdUseCase } from '@application/usecases/user/get-user-by-id.usecase';
import { ListUserUseCase } from '@application/usecases/user/list-user.usecase';
import { UpdateUserUseCase } from '@application/usecases/user/update-user.usecase';
import { UpdateUserDto } from '@interface/dtos/user/update-user.dto';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Usuários | users")
@Controller('users')
export class UserController {

    constructor(
        private readonly listUser: ListUserUseCase,
        private readonly deleteUser: DeleteUserUseCase,
        private readonly updateUser: UpdateUserUseCase,
        private readonly getUserById: GetUserByIdUseCase
    ) { }

    @ApiOperation({ summary: "Lista todos os usuários do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async list() {
        return this.listUser.execute();
    }

    @ApiOperation({ summary: "Deleta um usuário do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Delete("/delete/:id")
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.deleteUser.execute(id);
    }

    @ApiOperation({ summary: "Atualiza as informações de um usuário do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 401, description: "Erro com o token de autorização do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @UseGuards(AuthGuard)
    @Put("/update/:id")
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', new ParseIntPipe) id: number,
        @Body() data: UpdateUserDto
    ) {
        return await this.updateUser.execute(id, data);
    }

    @ApiOperation({ summary: "Busca um usuário específico do sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id', new ParseIntPipe()) id: number) {
        return this.getUserById.execute(id);
    }

}

