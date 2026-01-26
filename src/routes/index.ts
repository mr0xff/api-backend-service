import { FastifyInstance } from "fastify";

export default function index(fastify: FastifyInstance){
  fastify.get("/", (req, res) => {
    res.send({ message: "hello world"})
  })
}