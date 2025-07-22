export class Favorite {
  resource: string;
  favorited_by: {
    id: number;
    name: string;
    email: string;
  };
  post: {
    id: number;
    headline: string;
    content: string;
    user_rel: {
      id: number;
      name: string;
      email: string;
    };
  };

  constructor(
    resource: string,
    favorited_by: { id: number; name: string; email: string },
    post: {
      id: number;
      headline: string;
      content: string;
      user_rel: { id: number; name: string; email: string };
    }
  ) {
    this.resource = resource;
    this.favorited_by = favorited_by;
    this.post = post;
  }
}
