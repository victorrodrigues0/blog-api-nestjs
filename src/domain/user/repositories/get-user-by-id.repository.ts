import { User } from "../entities/user.entity";

export interface GetUserByIdInterface {
    execute(id: number): Promise<User | null>
}