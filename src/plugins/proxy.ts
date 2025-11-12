import fp from "fastify-plugin";
import fastifyHttpProxy from "@fastify/http-proxy";

export default fp(function(fastify){
  fastify.register(fastifyHttpProxy, {
    upstream: fastify.config.PROXY_ADDRESS,
    prefix: "/proxy"
  })
}, {
  dependencies: [
    "env"
  ]
})
