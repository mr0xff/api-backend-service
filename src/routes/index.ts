import { FastifyInstance } from "fastify";

export default function root(fastify: FastifyInstance){
  fastify.all("/", (req, res) => res.send({ msg: `you maked ${req.method} method` }));
  fastify.all("/throw", (req, res)=>res.notFound());
}