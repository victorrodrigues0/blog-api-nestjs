import { SignUpRepository } from "@domain/auth/repositories/sign-up.repository";
import { AuthRepositoryImpl } from "@infra/database/repositories/auth/auth.repository.impl";
import { SignUpDto } from "@interface/dtos/auth/sign-up.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class SignUpUseCase implements SignUpRepository {
    constructor(
        private readonly authRepository: AuthRepositoryImpl

    ) { }
    async execute(data: SignUpDto) {
        try {
            const response = await this.authRepository.signUp(data);

            if (!response) {
                throw new InternalServerErrorException();
            }

            return response;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }
    }
}