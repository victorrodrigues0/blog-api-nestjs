import { SignInRepository } from "@domain/auth/repositories/sign-in.repository";
import { AuthRepositoryImpl } from "@infra/database/repositories/auth/auth.repository.impl";
import { SignInDto } from "@interface/dtos/auth/sign-in.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SignInUseCase implements SignInRepository {

    constructor(
        private readonly authRepository: AuthRepositoryImpl
    ) { }

    async execute(data: SignInDto): Promise<string | null> {
        try {
            const response = await this.authRepository.signIn(data);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}