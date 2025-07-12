import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlredyExistException extends HttpException {
    constructor(name: string, email: string) {
        super(`User ${name} alredy exists with email ${email}.`, HttpStatus.CONFLICT);
    }
}