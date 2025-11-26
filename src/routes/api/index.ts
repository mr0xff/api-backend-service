import { FastifyInstance } from "fastify";

export default function api(fastify: FastifyInstance){
  fastify.get("/", (req, res) => {
    res.send({ msg: "hello world" });
  });
}