import { FastifyInstance } from "fastify";

export default function lote(fastify: FastifyInstance){
  const { prisma } = fastify;

  fastify.get("/", async function(req, res){
    const data = await prisma.productLote.findMany();
    
    res.send({
      items: data,
      quantity: data.length,
      when: Date.now()
    })
  });
}