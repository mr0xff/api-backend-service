import fp from "fastify-plugin";
import { UserService } from "../lib/services.js";
import { prisma } from "../lib/prisma.js";

const services = {
  user: new UserService(prisma)
}

export default fp(function(fastify){
  fastify.decorate("service", services);
}, {
  name: "service"
});

declare module "fastify" {
  export interface FastifyInstance {
    service: typeof services;
  }
}