import { User } from "../entities/user.entity";

export interface ListUserRepositoryInterface {
    list(): Promise<User[]>;
}