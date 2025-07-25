export class Post {
    private id: number;
    private headline: string;
    private content: string;
    private images: {image: string}[];
    private user_id: number;

    constructor(
        id: number,
        headline: string,
        content: string,
        images: {image: string}[],
        user_id: number
    ) {
        this.id = id;
        this.headline = headline;
        this.content = content;
        this.images = images;
        this.user_id = user_id;
    }
}