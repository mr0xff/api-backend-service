import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

export default fp(function(fastify){
  fastify.register(fastifyEnv, {
    confKey: "config",
    schema: {
      type: "object",
      properties: {
        SECRET: { type: "string" }
      },
      required: ["SECRET"]
    }
  });
}, {
  name: "env"
});

declare module "fastify" {
  interface FastifyInstance {
    config: {
      SECRET: string
    }
  }
}