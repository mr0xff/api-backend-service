import { FastifyInstance } from "fastify";

export default function callback(fastify:FastifyInstance){
  fastify.get("/", async function(req, res){
    const params = fastify.oAuthClient.callbackParams(req.raw);
    const state = req.session.get('oidc_state');
    const nonce = req.session.get('oidc_nonce');

    try {
      // Troca o código pelo Token e VALIDA a assinatura do Google
      const tokenSet = await fastify.oAuthClient.callback('http://localhost:3000/callback', params, { state, nonce });
      
      const claims = tokenSet.claims(); // Aqui estão nome, email e sub

      // Salva o usuário na sessão do SEU app
      req.session.set('user', {
        id: claims.sub,
        name: claims.name,
        email: claims.email
      });

      res.redirect('/dashboard');
    } catch (e) {
      const err = e as Error; 
      res.status(400).send('Falha na autenticação: ' + err.message);
    }
  })
}