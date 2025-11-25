import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

export default fp(function(fastify){
  fastify.register(fastifyEnv, {
    confKey: "config",
    schema: {
      type: "object",
      properties: {
        PSQL_URL: { type: "string" }
      },
      required: ["PSQL_URL"]
    }
  });
}, {
  name: "env"
});

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PSQL_URL: string
    }
  }
}