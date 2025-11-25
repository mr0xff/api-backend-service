import fp from "fastify-plugin";
import pg from "@fastify/postgres";

export default fp(function(fastify){
  fastify.register(pg, {
    connectionString: fastify.config.PSQL_URL
  })
}, {
  dependencies: ["env"]
})