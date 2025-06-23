import fastifyPlugin from "fastify-plugin";
import fastifyRedis from "@fastify/redis";

export default fastifyPlugin(function(fastify){
  fastify.register(fastifyRedis, {
    url: process.env.REDIS_URL
  });
})