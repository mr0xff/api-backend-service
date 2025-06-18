import { FastifyInstance } from "fastify";

export default async function moke(fastify: FastifyInstance){
  fastify.post("/", async function (req, res){
    res.send({

    });
  })
}