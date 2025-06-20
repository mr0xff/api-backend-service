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
  fastify.get("/", { schema: indexSchema }, function(req, res){
    res.send({ icmp: "pong" });
  });
}