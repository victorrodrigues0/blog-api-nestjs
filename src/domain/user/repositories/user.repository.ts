import { Prisma } from "generated/prisma";
import { User } from "../entities/user.entity";

export interface UserRepository {
    list(): Promise<User[] | undefined>;
    delete(id: number): Promise<User | null>;
    update(id: number, data: Prisma.usersUpdateInput): Promise<User | null>;
    getById(id: number): Promise<User | null>;
}