export class Post {
    private id: number;
    private headline: string;
    private content: string
    private user_id: number

    constructor(
        id: number,
        headline: string,
        content: string,
        user_id: number
    ) {
        this.id = id;
        this.headline = headline;
        this.content = content;
        this.user_id = user_id;
    }
}