import fp from "fastify-plugin";

const service = {}
const dto = {}

export default fp(fastify => {
  fastify.decorate("service", service);
  fastify.decorate("dto", dto);
});

declare module "fastify" {
  export interface FastifyInstance {
    service: typeof service;
    dto: typeof dto;
  }
}