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
    routePrefix: "/doc"
  });
})