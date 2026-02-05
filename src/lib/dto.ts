export class TaskDTO {
  title: string;
  completed: boolean;

  constructor(title: string, completed = false){
    this.title = title;
    this.completed = completed;
    this.#validate();
  }

  #validate(){
    if(typeof this.title !== "string" || typeof this.completed !== "boolean")
      throw new TypeError("invalid type!");
  }
}

type Optional<T> = T | null;

export class User {
  id: Optional<number>;
  name: string;
  email: string;
  posts: Post[];

  constructor(id: Optional<number> = null, name: string, email: string, posts: Post[]){
    this.id = id;
    this.email = email;
    this.name = name;
    this.posts = posts;
  }
}

export class Post {
  id: Optional<number> ;
  title: string;
  content: Optional<string>;
  published: boolean;
  author: User;
  authorId: number;

  constructor(
    id: Optional<number> = null,
    title: string,
    content: Optional<string> = null,
    published: boolean,
    author: User,
    authorId: number
  ) {
    this.author = author;
    this.authorId = authorId;
    this.content = content;
    this.id = id;
    this.published = published;
    this.title = title;
  }
}

export class JsonResponse<T>{
  data: Optional<T>;
  status: boolean;
  message: Optional<string>;
  __v = "1"

  constructor({
    data,
    status,
    message
  }: { 
    data: Optional<T>;
    status: boolean;
    message: Optional<string>;
  }) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}