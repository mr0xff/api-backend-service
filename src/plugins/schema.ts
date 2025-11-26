import fp from "fastify-plugin";

export default fp(fastify => {
  fastify.register((fs, _, done)=>{
    fastify.addSchema({
      $id: "user",
      type: "object",
      properties: {
        username: {
          type: "string",
          maxLength: 40
        },
        id: { type: "integer" }
      },
      required: ["username", "id"]
    });

    done();
  });
});