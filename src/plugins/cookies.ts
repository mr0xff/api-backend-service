import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";

export default fp(function(fastify){
  fastify.register(fastifyCookie)
})