import { User } from "src/domain/user/entities/user.entity";
import { UserRepository } from "src/domain/user/repositories/user.repository";
import { PrismaService } from "../../prisma/prisma.service";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UpdateUserDto } from "@interface/dtos/user/update-user.dto";
import * as bcrypt from "bcrypt";
import { unlinkSync } from "fs";

@Injectable()
export class UserRepositoryImpl implements UserRepository {

    constructor(private readonly databaseService: PrismaService) { }
    async list() {
        try {
            const usersData = await this.databaseService.users.findMany();

            if (!usersData) {
                throw new BadRequestException("Error to get users.");
            }

            const users = usersData.map(user => new User(user.id, user.name, user.email, user.password, user.image));

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
                throw new BadRequestException("Error to remove user.");
            }

            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(id: number, data: UpdateUserDto,) {
        try {
            const user = await this.databaseService.users.findUnique({ where: { id } });

            if (!user) {
                throw new BadRequestException("Error to find user.");
            }

            if (data.password) {
                const newPassword = await bcrypt.hash(data.password, 10);
                data = {
                    name: data.name,
                    email: data.email,
                    password: newPassword,
                    image: data.image
                }
            }

            if (user.image.trim() !== '') {
                unlinkSync('./public/uploads/user/' + user.image)
            }

            const updatedUSer = await this.databaseService.users.update({
            where: { id },
            data,
        });

        if (!updatedUSer) {
            throw new BadRequestException("Error to update user data.");
        }

        const response = new User(updatedUSer.id, updatedUSer.name, updatedUSer.email, updatedUSer.password, updatedUSer.image);

        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

    async getById(id: number) {
    try {
        const user = await this.databaseService.users.findUnique({
            where: { id },
        });

        if (!user) {
            throw new BadRequestException("Error to find user.");
        }

        const response = new User(user.id, user.name, user.email, user.password, user.image);

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
}