import { SignUpDto } from "@interface/dtos/auth/sign-up.dto";

export interface SignUpRepository {
    execute(data: SignUpDto): Promise<string | null>
}