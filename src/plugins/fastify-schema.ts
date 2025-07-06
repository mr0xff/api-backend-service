import fastifyPlugin from "fastify-plugin";
import { FastifySchema } from "fastify";

const PostStoreContent: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" }
    }
  }
}

const schemas = {
  PostStoreContent
}

export default fastifyPlugin(function(fastify){
  fastify.decorate("schema", schemas);
});

declare module "fastify" {
  export interface FastifyInstance {
    schema: typeof schemas;
  }
}