import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default fp(function(fastify){
  fastify.decorate("prisma", prisma);
});

declare module "fastify" {
  export interface FastifyInstance {
    prisma: typeof prisma;
  }
}