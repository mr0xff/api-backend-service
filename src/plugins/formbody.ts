import fp from "fastify-plugin";
import fastifyFormBody from "@fastify/formbody";

export default fp(function(fastify){
  fastify.register(fastifyFormBody);
});