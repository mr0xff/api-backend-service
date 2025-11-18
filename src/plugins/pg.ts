import fp from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";

export default fp(function(fastify){
  fastify.register(fastifyPostgres, {
    connectionString: fastify.config.PSQL_URL
  });
}, {
  dependencies: ["env"]
})