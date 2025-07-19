import { User } from "@domain/user/entities/user.entity";
import { GetUserByIdInterface } from "@domain/user/repositories/get-user-by-id.repository";
import { UserRepositoryImpl } from "@infra/database/repositories/user/user.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdInterface {

    constructor(
        private readonly userRepository: UserRepositoryImpl
    ) {}

    async execute(id: number): Promise<User | null> {
        try {
            return await this.userRepository.getById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}