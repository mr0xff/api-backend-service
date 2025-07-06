import { FastifyInstance } from "fastify";

export default function protocols(fastify: FastifyInstance){
  fastify.get("/", function(req, res){
    res.code(404).send({ msg: "we dont have any registred protocol!" });
  });
}