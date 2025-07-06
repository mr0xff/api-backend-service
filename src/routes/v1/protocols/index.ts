import { FastifyInstance, RouteGenericInterface } from "fastify";

interface StoreContent extends RouteGenericInterface {
  Body: {
    name: string;
    age: number;
  }
};

export default async function protocols(fastify: FastifyInstance){
  const { PostStoreContent } = fastify.schema;
  const { redis } = fastify;

  fastify.get("/", function(req, res){
    res.code(404).send({ msg: "we dont have any registred protocol!" });
  });

  fastify.get("/cachedContent", async function(req, res){
    const data = await redis.get("content:1");
    
    res.code(data ? 200 : 404).send({
      data: data ? JSON.parse(data) : "sorry, not found any cached content!"
    });
  });

  fastify.post<StoreContent>("/storeContent", { schema: PostStoreContent }, async function(req, res){
    const { name, age } = req.body;
    
    await redis.set("content:1", JSON.stringify({ name, age })); // cache aside
    
    res.code(201).send({ mesg: "we created your content!" });
  });
}