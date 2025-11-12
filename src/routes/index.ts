import type { FastifyInstance } from "fastify";

export default function index(f: FastifyInstance){
  f.all("/env", function(req, res){
    res.send(f.getEnvs());
  });

  f.all("/env/1", function(_, res){
    res.send(f.config.SHELL)
  })
}