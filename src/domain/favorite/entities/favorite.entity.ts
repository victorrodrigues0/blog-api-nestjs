import { PostRelType } from "@domain/post/types/post_rel.type";
import { UserRelType } from "@domain/user/types/user_rel.type";

export class Favorite {
  resource: string;
  favorited_by: UserRelType;
  post: {
    user_rel: UserRelType
  };

  constructor(
    resource: string,
    favorited_by: UserRelType,
    post: {
      user_rel: UserRelType
    }
  ) {
    this.resource = resource;
    this.favorited_by = favorited_by;
    this.post = post;
  }
}
