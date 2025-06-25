import { FastifyInstance, FastifySchema } from "fastify";

const postSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      qty: { type: "number" },
    },
    required: [ "qty" ]
  }
}

export default async function moke(fastify: FastifyInstance){
  fastify.post("/", { schema: postSchema }, async function (req, res){
    const { qty } = req.body as { qty: number };
    
    res.send(Array(qty).fill(null).map((p, index)=>index));
  });
}