import { FastifyInstance, RouteGenericInterface } from "fastify";

interface PostRoute extends RouteGenericInterface {
  Body: {
    user: string;
    bio?: string;
  }
}

export default async function employees(fastify: FastifyInstance){
  const { mongo, schema } = fastify;

  fastify.get("/", async function(req, res){
    const a = await mongo.User.find();

    res.send({
      employees: a,
      quantity: a.length,
      when: Date.now()
    });
  });

  fastify.post<PostRoute>("/", { schema: schema.PostEmployee }, async function(req, res){
    const { user, bio } = req.body;
    
    await mongo.User.create({ user, bio });

    res.send({ msg: "created!" });
  });
}