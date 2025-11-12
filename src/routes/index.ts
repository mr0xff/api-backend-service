import { FastifyInstance } from "fastify";
import { z } from "zod";

const User = z.object({
  id: z.int().min(1),  
});

const Car = z.object({
  model: z.union([z.literal("toyota"), z.literal("suzuki")])
});


const Body = z.union([User, Car]);

export default function root(fastify: FastifyInstance){
  fastify.all("*", function(req, res){
    const body = Body.safeParse(req.body);

    fastify.log.info(body);

    res.send(body);
  })
}