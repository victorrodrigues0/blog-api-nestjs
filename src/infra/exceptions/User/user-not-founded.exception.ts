import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundedException extends HttpException {

    constructor() {
        super("User not founded", HttpStatus.NOT_FOUND);
    }

}