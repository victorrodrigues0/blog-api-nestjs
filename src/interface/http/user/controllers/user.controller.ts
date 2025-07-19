import { DeleteUserUseCase } from '@application/usecases/user/delete-user.usecase';
import { GetUserByIdUseCase } from '@application/usecases/user/get-user-by-id.usecase';
import { ListUserUseCase } from '@application/usecases/user/list-user.usecase';
import { UpdateUserUseCase } from '@application/usecases/user/update-user.usecase';
import { UpdateUserDto } from '@interface/dtos/user/update-user.dto';
import { AuthGuard } from '@interface/http/auth/guards/auth.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {

    constructor(
        private readonly listUser: ListUserUseCase,
        private readonly deleteUser: DeleteUserUseCase,
        private readonly updateUser: UpdateUserUseCase,
        private readonly getUserById: GetUserByIdUseCase
    ) { }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async list() {
        return this.listUser.execute();
    }

    @Delete("/delete/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.deleteUser.execute(id);
    }

    @UseGuards(AuthGuard)
    @Put("/update/:id")
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', new ParseIntPipe) id: number,
        @Body() data: UpdateUserDto
    ) {
        return await this.updateUser.execute(id, data);
    }

    @UseGuards(AuthGuard)
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id', new ParseIntPipe()) id: number) {
        return this.getUserById.execute(id);
    }

}

