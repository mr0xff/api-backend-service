import fastifyPlugin from "fastify-plugin";
import { FastifySchema } from "fastify";

const PostEmployee:FastifySchema = {
  body: {
    type: "object",
    properties: {
      user: { type: "string" },
      bio: { type: "string" }
    },
    required: ["user"]
  }
}

const schemas = {
  PostEmployee,
}

export default fastifyPlugin(function(fastify){
  fastify.decorate("schema", schemas);
});

declare module "fastify" {
  export interface FastifyInstance {
    schema: typeof schemas;
  }
}