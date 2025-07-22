export class Comment {
    private readonly resource: string;
    private readonly content: string;
    private readonly user_id: number;

    constructor(
        resource: string,
        content: string,
        user_id: number
    ) {
        this.resource = resource;
        this.content = content;
        this.user_id = user_id;
    }
}