import { User } from "@domain/user/entities/user.entity";
import { ListUserRepository } from "@domain/user/repositories/list-user.repository";
import { UserRepositoryImpl } from "@infra/database/repositories/user/user.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListUserUseCase implements ListUserRepository {

    constructor(
        private readonly userRepository: UserRepositoryImpl
    ) { }

    execute(): Promise<User[] | null> {
        return this.userRepository.list();
    }
}