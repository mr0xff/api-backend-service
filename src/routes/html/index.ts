import { FastifyInstance } from "fastify";

export default function html(fastify: FastifyInstance){
  
  fastify.get("/", (req, res)=>{
    res.view("index.pug")
  });
}