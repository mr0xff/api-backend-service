import fp from "fastify-plugin";
import fastifyView from "@fastify/view";

export default fp((fastify)=>{
  fastify.register(fastifyView, {
    engine: {
      pug: import("pug")
    },
    root: "src/views"
  })
});