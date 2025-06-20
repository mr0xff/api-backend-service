import fastifyPlugin from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default fastifyPlugin(function(fastify){
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Backend service trainning',
        description: 'Hello this is a backend service for practice frontend intregration and so on',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'https://backend-service-tranning.onrender.com',
          description: 'Development server'
        },
        {
          url: 'https://backend-service-tranning-production.up.railway.app',
          description: 'Development server on Railway'
        },
        {
          url: 'http://localhost:3000',
          description: 'Local server'
        }
      ],
      tags: [
      
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      }
    }
  });
  
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/doc",
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });
})