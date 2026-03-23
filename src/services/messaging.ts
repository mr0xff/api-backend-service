import { Database } from "./types.js";

export default class MessagingService {
  #db: Database;

  constructor(db: Database){
   this.#db = db;
  }

  async write({
    sender_id,
    receiver_id,
    body
  }: {
    sender_id: string;
    receiver_id: string;
    body: string;
  }){
    const data = await this.#db.message.create({
      data: {
        sender_id,
        receiver_id,
        body
      }
    });

    return data.id;
  }

  async read(user_id: string){
    const data = await this.#db.message.findMany({
      where: { sender_id: user_id },
      include: {
        sender: true
      }
    });

    return data;
  }

  async readChat(){
    return await this.#db.message.findMany({
      select: {
        id: true,
      }
    })
  }
}