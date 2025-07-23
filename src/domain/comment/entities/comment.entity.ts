import { UserRelType } from "@domain/user/types/user_rel.type";

export class Comment {
    private readonly resource: string;
    private readonly content: string;
    private readonly comment_id: number;
    private readonly resource_rel: any;
    private readonly user_rel: UserRelType;

    constructor(
        resource: string,
        comment_id: number,
        content: string,
        resource_rel: any,
        user_rel: UserRelType
    ) {
        this.resource = resource;
        this.comment_id = comment_id;
        this.content = content;
        this.resource_rel = resource_rel;
        this.user_rel = user_rel;
    }
}