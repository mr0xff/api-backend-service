import { FastifyInstance, RouteGenericInterface } from "fastify";

interface PostRoute extends RouteGenericInterface {
  Body: {
    user: string;
    bio?: string;
  }
}

export default async function employees(fastify: FastifyInstance){
  const { mongo, schema, redis } = fastify;
  const rediskeys = {
    users: "user:list"
  }

  fastify.get("/", async function(req, res){
    const users = await redis.get(rediskeys.users);

    const a =  users ? JSON.parse(users) : await mongo.User.find();
    
    if(!users)
      await redis.set(rediskeys.users, JSON.stringify(a), "EX", 300);

    res.send({
      employees: a,
      quantity: a.length,
      when: Date.now()
    });
  });

  fastify.post<PostRoute>("/", { schema: schema.PostEmployee }, async function(req, res){
    const { user, bio } = req.body;
    
    await mongo.User.create({ user, bio });

    await redis.del(rediskeys.users);

    res.send({ msg: "created!" });
  });

  fastify.delete("/", async function(req, res){
    await mongo.User.deleteMany();

    await redis.del(rediskeys.users);
    
    res.send({ msg: "todos os registros detelados" });
  });
}