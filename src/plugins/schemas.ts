import fp from "fastify-plugin";

export default fp(function(fastify){
  fastify.addSchema({
    $id: "userPost",
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "integer" }
    },
    required: [ "name", "age" ]
  });

});