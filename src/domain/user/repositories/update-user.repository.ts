import { UpdateUserDto } from "@interface/dtos/user/update-user.dto";
import { User } from "../entities/user.entity";

export interface UpdateUserRepository {
    execute(id: number, data: UpdateUserDto): Promise<User | null>
}