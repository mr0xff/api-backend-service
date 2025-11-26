import { FastifyInstance } from "fastify";

export default function root(fastify: FastifyInstance){
  fastify.addHook("preHandler", (_, __, done)=>{
    const schemas = fastify.getSchemas();

    console.log(schemas);

    done();
  });

  fastify.patch("/", { schema: { body: { $ref: "commonSchema"}}}, (req, res)=>{
    const body = req.body;
    fastify.log.warn(body);

    res.send();
  });

  fastify.post("/", {
    schema: {
      body: {
        $ref: "commonSchema"
      }
    }
  }, (req, res)=>{
    fastify.log.warn(req.body);

    res.send(fastify.getSchemas());
  })
}