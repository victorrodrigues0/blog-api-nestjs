import { DeleteUserRepository } from "@domain/user/repositories/delete-user.repository";
import { UserRepositoryImpl } from "@infra/database/repositories/user/user.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase implements DeleteUserRepository {

    constructor(
        private readonly userRepository: UserRepositoryImpl
    ) {}

    async execute(id: number): Promise<void | null> {
        try {
            return await this.userRepository.delete(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}