import { User } from "../entities/user.entity";

export interface UserRepository {
    list(): Promise<User[] | undefined>;
    delete(id: number): Promise<void | null>;
    update(id: number, data: Omit<User, "id">): Promise<User | null>;
    getById(id: number): Promise<User | null>;
}