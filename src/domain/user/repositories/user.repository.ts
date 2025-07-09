import { User } from "../entities/user.entity";

export interface UserRepositoryInterface {
    list(): Promise<User[]> | null;
    delete(id: string): Promise<void> | null;
    update(user: User): Promise<User> | null;
    getById(id: string): Promise<User> | null;
}