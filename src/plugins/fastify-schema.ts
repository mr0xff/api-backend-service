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

const PostProduct:FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      price: { type: "number" }
    },
    required: [ "name", "price" ]
  }
}

const schemas = {
  PostEmployee,
  PostProduct
}

export default fastifyPlugin(function(fastify){
  fastify.decorate("schema", schemas);
});

declare module "fastify" {
  export interface FastifyInstance {
    schema: typeof schemas;
  }
}