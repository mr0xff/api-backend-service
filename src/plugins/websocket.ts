import fp from "fastify-plugin";
import websocket from "@fastify/websocket";

export default fp(function(fastify){
  fastify.register(websocket);
});

