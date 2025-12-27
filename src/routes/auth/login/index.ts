import { FastifyInstance } from "fastify";
const { generators } = require('openid-client');

export default function login(fastify:FastifyInstance){
  fastify.get("/", function(req, res){
      const nonce = generators.nonce();
      const state = generators.state();

      // Salva na sessão para verificar no callback
      req.session.set('oidc_state', state);
      req.session.set('oidc_nonce', nonce);

      const authUrl = fastify.oAuthClient.authorizationUrl({
        scope: 'openid email profile',
        state,
        nonce,
      });
      res.redirect(authUrl);
  })
}