import { User } from "src/domain/user/entities/user.entity";
import { UserRepository } from "src/domain/user/repositories/user.repository";
import { PrismaService } from "../../prisma/prisma.service";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "generated/prisma";

export class UserRepositoryImpl implements UserRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async list() {
        try {
            const usersData = await this.prismaService.users.findMany();

            if (!usersData) {
                throw new BadRequestException();
            }

            const users = usersData.map(u => new User(u.id, u.name, u.email, u.password));

            return users;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async delete(id: number) {
        try {
            const deletedUser = await this.prismaService.users.delete({ where: { id } });

            if (!deletedUser) {
                throw new BadRequestException();
            }

            const response = new User(deletedUser.id, deletedUser.name, deletedUser.email, deletedUser.password);

            return response;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async update(id: number, data: Prisma.usersUpdateInput) {
        try {
            const user = await this.prismaService.users.findUnique({ where: { id } });

            if (!user) {
                throw new BadRequestException();
            }

            const updatedUSer = await this.prismaService.users.update({ where: { id }, data });

            if (!updatedUSer) {
                throw new BadRequestException();
            }

            const response = new User(updatedUSer.id, updatedUSer.name, updatedUSer.email, updatedUSer.password);

            return response;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async getById(id: number) {
        try {
            const user = await this.prismaService.users.findUnique({ where: { id } });

            if (!user) {
                throw new BadRequestException();
            }

            const response = new User(user.id, user.name, user.email, user.password);

            return response;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}