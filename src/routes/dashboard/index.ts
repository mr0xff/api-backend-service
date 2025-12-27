import { FastifyInstance } from "fastify";

export default function dashboard(fastify:FastifyInstance){
  fastify.get("/", function(req, res){
    const user = req.session.get('user');
    if (!user) return res.status(401).send('Não autorizado');
    return { message: `Bem-vindo, ${user.name}`, user };
  })
}