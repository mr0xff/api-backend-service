import type { FastifyInstance } from "fastify";
import { readFile } from "fs/promises";

type CID = {
  code: string;
  value: string;
}
export default async function index(fastify: FastifyInstance){
  fastify.log.warn("inicialização da rota ... ");

  const buf = await readFile("cid10.json");

  const ascii = (JSON.parse(buf.toString()) as CID[]).map(e =>({
    valueUpper: e.value.toUpperCase(),
    ...e
  }));

  const codes = new Map();

  ascii.forEach(e => codes.set(e.code, e));
  
  fastify.get<{Params: { ref: string }}>("/:ref", (req, res)=>{

    const { ref } = req.params;
    const refUpper = ref.toUpperCase();

    const r = [];

    if(codes.has(refUpper.toUpperCase())){
      res.send(codes.get(refUpper.toUpperCase()));
      return;
    }

    for(const i of ascii){
      if(r.length > 20)
        throw fastify.httpErrors.badRequest("lista longa de resultado, detalhe a referencia!")
      
      if(i.valueUpper.includes(refUpper))
        r.push(i);
    }

    res.send(r);
  });
}
