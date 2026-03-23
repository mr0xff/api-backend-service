import { Database } from "./types.js";

export default class UserService {
  #db: Database;

  constructor(db: Database){
    this.#db = db;
  }

  async create({ name }: { name: string }){
    const data = await this.#db.user.create({ data: { name }});
    
    return data.id
  }

  async list(){
    return await this.#db.user.findMany();
  }
}