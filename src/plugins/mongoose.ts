import fastifyPlugin from "fastify-plugin";
import { createConnection } from "mongoose";
import { UserSchema } from "../db/schema.js";
const con = createConnection(process.env.MONGO_URL as string);

const UserModel = con.model("User", UserSchema);

const mongo = {
  User: UserModel 
}

export default fastifyPlugin(function(fastify){
  fastify.decorate("mongo", mongo);
});

declare module "fastify" {
  export interface FastifyInstance {
    mongo: typeof mongo;
  }
}