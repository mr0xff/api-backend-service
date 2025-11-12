import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

export default fp(function(fastify){
  fastify.register(fastifyEnv, {
    schema: {
      type: "object",
      properties: {
        PROXY_ADDRESS: { type: "string" }
      },
      required: ["PROXY_ADDRESS"]
    },
    dotenv: {
      debug: true
    },
    confKey: "config"
  });
}, {
  name: "env"
});

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PROXY_ADDRESS: string
    }
  }
}