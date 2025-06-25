import { FastifyInstance, FastifySchema } from "fastify";

const indexSchema: FastifySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        icmp: { type: "string" }
      }
    }
  }
} 

export default async function ping(fastify:FastifyInstance){
  // const { redis } = fastify;

  fastify.get("/", { schema: indexSchema }, async function(req, res){
    res.send({ to: "pong"});
  });

  fastify.get("/:target", async function(req, res){
    const { target } = req.params as { target: string };

    // await redis.hset("user:1", { id: 0, name: "root", ports: [99, 80, 443] });

    // const data = await redis.hgetall("user:1");
    // console.log(data);

    res.send({
      msg: "echo to target",
      to: target,
      response: "pending"
    })
  });
}