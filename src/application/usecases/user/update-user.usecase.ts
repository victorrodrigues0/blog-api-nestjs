import { User } from "@domain/user/entities/user.entity";
import { UpdateUserRepository } from "@domain/user/repositories/update-user.repository";
import { UserRepositoryImpl } from "@infra/database/repositories/user/user.repository.impl";
import { UpdateUserDto } from "@interface/dtos/user/update-user.dto";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUserUseCase implements UpdateUserRepository {

    constructor(
        private readonly userRepository: UserRepositoryImpl
    ) {}

    async execute(id: number, data: UpdateUserDto): Promise<User | null> {
        try {
            // if(!data.email || data.password || data.name) {
            //     throw new BadRequestException("Error to get the fields.")
            // }
            return await this.userRepository.update(id, data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}