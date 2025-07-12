import { User } from "@domain/user/entities/user.entity";
import { SignInDto } from "@interface/dtos/auth/sign-in.dto";
import { SignUpDto } from "@interface/dtos/auth/sign-up.dto";

export interface AuthRepository {
    signUp(data: SignUpDto): Promise<string | null>
    signIn(data: SignInDto): Promise<string | null>
}