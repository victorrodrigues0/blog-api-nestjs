import { User } from "../entities/user.entity";

export interface ListUserRepository {
    execute(): Promise<User[] | null>;
}