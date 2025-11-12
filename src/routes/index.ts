import type { FastifyInstance } from "fastify";

export default function index(fastify:FastifyInstance){
  fastify.all("/", function(req, res){

    res.send(JSON.stringify({ message: "hello"}))
  });


  fastify.all("sql", function(req, res){
    //const data = new fastify.sqlite.DatabaseSync(":memory:");
    
  })
}