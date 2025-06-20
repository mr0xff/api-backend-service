import fastifyPlugin from "fastify-plugin";
import fastifyRateLimit from "@fastify/rate-limit";

export default fastifyPlugin(function(fastify){
  fastify.register(fastifyRateLimit, {
    max: 10,
    timeWindow: 10000
  });
})