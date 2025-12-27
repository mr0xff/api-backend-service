import { FastifyInstance } from "fastify";

export default function logout(fastify:FastifyInstance){
  fastify.get("/", function(req, res){
    req.session.delete();
    res.send({ message: 'Você saiu do app.' });
  })
}