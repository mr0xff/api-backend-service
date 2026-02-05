import fp from "fastify-plugin";
import { User } from "../lib/dto.js";

const dto = {
  user: User
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