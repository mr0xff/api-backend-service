import fp from "fastify-plugin";
import secureSession from "@fastify/secure-session";
const { Issuer } = require('openid-client');

const googleIssuer = await Issuer.discover('https://accounts.google.com');
const client = new googleIssuer.Client({
  client_id: 'SEU_CLIENT_ID.apps.googleusercontent.com',
  client_secret: 'SEU_CLIENT_SECRET',
  redirect_uris: ['http://localhost:3000/callback'],
  response_types: ['code'],
});
  
export default fp(async function(fastify){
  fastify.register(secureSession, {
    key: Buffer.alloc(32, fastify.config.SECRET), // Use uma chave real em produção
    cookie: { path: '/', httpOnly: true }
  });

  fastify.decorate("oAuthClient", client);
}, {
  dependencies: ["env"]
})

declare module "fastify"{
  export interface FastifyInstance {
    oAuthClient: typeof client;
  }
}

declare module '@fastify/secure-session' {
  interface SessionData {
    oidc_state: string;
    oidc_nonce: string;
    user: {
      id: string;
      name: string;
      email: string;
    }
  }
}