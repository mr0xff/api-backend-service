import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

export default fp(function(f){
  const schema = {
    type: "object",
    properties: {
      AUTH_METHOD: {
        type: "string",
        default: "sshd"
      },
      SHELL: { type: "string", enum: ["/bin/bash", "/bin/zsh"] },
      API_KEY : {
        type: "string",
        enum: ["hello", "world"]
      }
    },
    required: ["API_KEY"]
  }

  f.register(fastifyEnv, {
    schema,
    dotenv: true,
    confKey: "config"
  });
})

declare module "fastify" {
  interface FastifyInstance {
    config: {
      SHELL: "/bin/bash" | "/bin/zsh"
    }
  }
}