import type { FastifyInstance, RouteGenericInterface } from "fastify";

interface Get extends RouteGenericInterface {
  Querystring: {
    i: string;
  }
}

export default function index(fastify:FastifyInstance){
  fastify.all("/env", function(_, res){
    res.send(fastify.config);
  });

  fastify.all("/shell", function(_, res){
    res.forbidden();
  });

  fastify.all("/int", function(req, res){
    res.send({
      value: 10_000_000,
    });
  });

  fastify.all<Get>("/cookies", function(_, res){
    const i = _.query.i ?? null
    
    if(!i) 
      throw fastify.httpErrors.badRequest("need querystring value");

    res
      .setCookie("_key", "custom value")
      .code(201)
      .send({ message: "created" });
  })
}