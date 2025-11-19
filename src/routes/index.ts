import type { FastifyInstance } from "fastify";

export default function index(fastify:FastifyInstance){
  fastify.get("*", function(req, res){
    const user = fastify.user; 
    user.name = "hacker";
    const u = fastify.user;
    u.name = "samurai"

    res.send({
      user, 
      cb: user.cb(),
      u
    });
  })
}
