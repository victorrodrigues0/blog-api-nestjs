import { AuthRepository } from "@domain/auth/repositories/auth.repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { SignInDto } from "@interface/dtos/auth/sign-in.dto";
import { SignUpDto } from "@interface/dtos/auth/sign-up.dto";
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async signUp(data: SignUpDto): Promise<string | null> {
        try {

            const verifyEmail = await this.prismaService.users.findUnique({ where: { email: data.email } });

            if (verifyEmail) {
                throw new ConflictException("User alredy exists.");
            }

            data.password = await bcrypt.hash(data.password, 10);

            const response = await this.prismaService.users.create({ data });

            if (!response) {
                throw new InternalServerErrorException("Error to register user.");
            }

            const token = this.jwtService.sign({
                id: response.id,
                name: response.name,
                email: response.email
            });

            return token;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(data: SignInDto): Promise<string | null> {
        try {

            const verifyEmail = await this.prismaService.users.findUnique({ where: { email: data.email } });

            if (!verifyEmail) {
                throw new ConflictException("Email not exists.");
            }

            
            const response = await this.prismaService.users.findUnique({ where: { email: data.email } });
            
            if (!response) {
                throw new BadRequestException("Error to find user in database.");
            }

            const comparePassword = await bcrypt.compare(data.password, response.password);

            if(!comparePassword) {
                throw new UnauthorizedException("Password is wrong.");
            }

            const token = this.jwtService.sign({
                id: response.id,
                name: response.name,
                email: response.email
            });

            return token;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
