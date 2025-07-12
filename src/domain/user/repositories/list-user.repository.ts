import { User } from "../entities/user.entity";

export interface ListUserRepositoryInterface {
    execute(): Promise<User[]>;
}