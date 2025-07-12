import { SignUpUseCase } from '@application/usecases/auth/sign-up.usecase';
import { SignUpDto } from '@interface/dtos/auth/sign-up.dto';
import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly signUpUseCase: SignUpUseCase

    ) { }

    @Post("/signup")
    @HttpCode(HttpStatus.OK)

    async signUp(@Body() data: SignUpDto): Promise<Object | null> {
        try {
            const token = this.signUpUseCase.execute(data);

            if(!token) {
                throw new InternalServerErrorException();
            }

            return {token};
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}
