import { FastifyInstance } from "fastify";

export default async function anyPath(fastify:FastifyInstance){
  fastify.get("/", async function(req, res){
    res.send({ message: "pong" })
  });
  
  fastify.get("/:id", async function(req, res){
    const { id } = req.params as { id: string };
    
    res.send({
      id: id,
      createAt: Date.now()
    });
  })
}