import type { FastifyInstance } from "fastify";

export default function index(fastify:FastifyInstance){
  fastify.all("/env", function(_, res){
    res.send(fastify.config);
  });

  fastify.all("/shell", function(_, res){
    res.forbidden();
  })
}