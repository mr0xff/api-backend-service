import fp from "fastify-plugin";
import { User, JsonResponse } from "../lib/dto.js";

const dto = {
  User,
  JsonResponse
}

export default fp(function(fastify){
  fastify.decorate("dto", dto);
}, {
  name: "dto"
});

declare module "fastify" {
  export interface FastifyInstance {
    dto: typeof dto;
  }
}