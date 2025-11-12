import fp from "fastify-plugin";
import { DatabaseSync } from "node:sqlite";

const sqlite = {
  DatabaseSync
}

export default fp(function(fastify){
  fastify.decorate("sqlite", sqlite);
});


declare module "fastify" {
  interface FastifyInstance {
    sqlite: typeof sqlite;
  }
}


