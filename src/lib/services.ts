import { User } from "./dto.js";

import { DIPrisma } from "./prisma.js";

export class UserService { 
  #repo: DIPrisma;

  constructor(repository: DIPrisma){
    this.#repo = repository;
  }

  async list(){
    const user = await this.#repo.user.findMany();
    return user.map(user => new User(user.id, user.name, user.email, []));
  }

  async create(user: User){
    const result = await this.#repo.user.create({
      data: {
        email: user.email,
        name: user.name, 
        posts: {
          create: {
            title: "test",
            content: "test",
            published: true
          }
        }
      },
      include: { posts: true }
    });

    return { id: result.id }
  }
}