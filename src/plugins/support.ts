import fp from 'fastify-plugin'

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  });

  fastify.addSchema({
    $id: "http://example.com/",
    type: "object",
    properties: {
      hello: { type: "string" }
    },
    required: ["hello"]
  });

  fastify.addSchema({
    $id: "commonSchema",
    type: "object",
    properties: {
      hello: { type: "string" }
    },
    required: ["hello"]
  });

})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}
