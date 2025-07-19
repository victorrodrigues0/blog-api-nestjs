import { SignUpRepository } from "@domain/auth/repositories/sign-up.repository";
import { AuthRepositoryImpl } from "@infra/database/repositories/auth/auth.repository.impl";
import { SignUpDto } from "@interface/dtos/auth/sign-up.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SignUpUseCase implements SignUpRepository {

    constructor(
        private readonly authRepository: AuthRepositoryImpl
    ) { }

    async execute(data: SignUpDto) {
        return await this.authRepository.signUp(data);
    }
}