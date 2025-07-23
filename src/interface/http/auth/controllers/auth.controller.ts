import { SignInUseCase } from '@application/usecases/auth/sign-in.usecase';
import { SignUpUseCase } from '@application/usecases/auth/sign-up.usecase';
import { SignInDto } from '@interface/dtos/auth/sign-in.dto';
import { SignUpDto } from '@interface/dtos/auth/sign-up.dto';
import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Autenticação | auth")
@Controller('auth')
export class AuthController {

    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase
    ) { }

    @ApiOperation({ summary: "Cadastra um usuário no sistema." })
    @ApiResponse({ status: 201, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 403, description: "Erro de conflito no cadastro do usuário." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @Post("/signup")
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() data: SignUpDto): Promise<Object | null> {
        const token = await this.signUpUseCase.execute(data);

        return { token };
    }

    @ApiOperation({ summary: "Faz o usuário entrar no sistema." })
    @ApiResponse({ status: 200, description: "Retorna com sucesso." })
    @ApiResponse({ status: 400, description: "Erro com a busca no banco de dados." })
    @ApiResponse({ status: 500, description: "Erro interno no servidor." })
    @Post("/signin")
    @HttpCode(HttpStatus.OK)
    async signin(@Body() data: SignInDto) {
        const token = await this.signInUseCase.execute(data);

        return { token };
    }
}
