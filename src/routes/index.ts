import { FastifyInstance } from "fastify";

export default function root(fastify: FastifyInstance){
  
  fastify.get("/", (req, res)=>{
    res.send(fastify.getSchemas());
  });
}