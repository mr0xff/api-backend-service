import { FastifyInstance, RouteGenericInterface } from "fastify";

interface PostRoute extends RouteGenericInterface {
  Body: {
    name: string;
    price: number;
  }
}

export default function products(fastify: FastifyInstance){
  const { prisma, redis } = fastify;
  
  fastify.post<PostRoute>("/", async function(req, res) {
    const { name, price } = req.body;

    await prisma.product.create({
      data: {
        name,
        unitPrice: price
      }
    });

    await redis.del("product:1");

    res.code(201).send({ msg: "producto registrado!" });
  });

  fastify.get("/", async function(req, res){
    const rdata = await redis.get("product:1");
    const data = rdata ? JSON.parse(rdata): await prisma.product.findMany();
    
    if(!rdata)
      await redis.set("product:1", JSON.stringify(data));

    res.send({
      items: data,
      quantity: data.length,
      when: Date.now()
    });
  });
}