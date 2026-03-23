import fp from "fastify-plugin";
import { MessagingService, UserService } from "../services/index.js";
import { prisma } from "../lib/prisma.js";

const service = {
  user: new UserService(prisma),
  messaging: new MessagingService(prisma)
};

export default fp(function(fastify){
  fastify.decorate("service", service);
});

declare module "fastify"{
  export interface FastifyInstance {
    service: typeof service;
  }
}