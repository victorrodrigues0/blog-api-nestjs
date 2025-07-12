import { SignInDto } from "@interface/dtos/auth/sign-in.dto";

export interface SignInRepository {
    execute(data: SignInDto): Promise<string | null>
}