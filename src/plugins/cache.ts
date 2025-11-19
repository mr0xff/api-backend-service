import fp from "fastify-plugin";
import { DatabaseSync } from "node:sqlite";

class User {
  name = "root";
  age = 23;
  
  cb(){
    return "hello "+this.name;
  }
}

export default fp (function(fastify){
  const db = new DatabaseSync(":memory:");
  db.exec("CREATE TABLE user_tb (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL)");

  fastify.decorate("user", new User);
  fastify.decorate("sqlite", new DatabaseSync(":memory:"));

});

declare module "fastify" {
  interface FastifyInstance {
    sqlite: DatabaseSync;
    user: User;
  }
}