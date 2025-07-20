import { User } from "src/domain/user/entities/user.entity";
import { UserRepository } from "src/domain/user/repositories/user.repository";
import { PrismaService } from "../../prisma/prisma.service";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class UserRepositoryImpl implements UserRepository {

    constructor(private readonly databaseService: PrismaService) { }
    async list() {
        try {
            const usersData = await this.databaseService.users.findMany();

            if (!usersData) {
                throw new BadRequestException();
            }

            const users = usersData.map(u => new User(u.id, u.name, u.email, u.password));

            return users;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async delete(id: number) {
        try {
            const deletedUser = await this.databaseService.users.delete({ where: { id } });

            if (!deletedUser) {
                throw new BadRequestException();
            }

            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: number, data: Omit<User, "id">) {
        try {
            const user = await this.databaseService.users.findUnique({ where: { id } });

            if (!user) {
                throw new BadRequestException();
            }

            const updatedUSer = await this.databaseService.users.update({ where: { id }, data });

            if (!updatedUSer) {
                throw new BadRequestException();
            }

            const response = new User(updatedUSer.id, updatedUSer.name, updatedUSer.email, updatedUSer.password);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const user = await this.databaseService.users.findUnique({ where: { id } });

            if (!user) {
                throw new BadRequestException();
            }

            const response = new User(user.id, user.name, user.email, user.password);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}