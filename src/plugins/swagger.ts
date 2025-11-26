import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import scalar from "@scalar/fastify-api-reference";

export default fp((fastify)=>{
  fastify.register(swagger, {
     openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' }
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      }
    }
  });

  fastify.register(swaggerUi, {
    routePrefix: "/doc"
  });

  fastify.register(scalar, {
    routePrefix: "/doc2",
    configuration: {
      theme: "fastify"
    }
  })
});