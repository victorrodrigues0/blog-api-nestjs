import { SignInUseCase } from '@application/usecases/auth/sign-in.usecase';
import { SignUpUseCase } from '@application/usecases/auth/sign-up.usecase';
import { SignInDto } from '@interface/dtos/auth/sign-in.dto';
import { SignUpDto } from '@interface/dtos/auth/sign-up.dto';
import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase
    ) { }

    @Post("/signup")
    @HttpCode(HttpStatus.OK)
    async signUp(@Body() data: SignUpDto): Promise<Object | null> {
        const token = await this.signUpUseCase.execute(data);

        return { token };
    }

    @Post("/signin")
    @HttpCode(HttpStatus.OK)
    async signin(@Body() data: SignInDto) {
        const token = await this.signInUseCase.execute(data);

        return { token };
    }
}
