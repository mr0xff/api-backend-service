import type { FastifyInstance } from "fastify";
import { readFile } from "fs/promises";
import { CidService } from "../services/cid-service.js";

type CID = {
  code: string;
  value: string;
}
export default async function index(fastify: FastifyInstance){
  // fastify.log.warn("inicialização da rota ... ");

  // const buf = await readFile("cid10.json");
  // (new CidService("cid10.json")).test();

  // const ascii = (JSON.parse(buf.toString()) as CID[]).map(e =>({
  //   valueUpper: e.value.toUpperCase(),
  //   ...e
  // }));

  // const codes = new Map();

  // ascii.forEach(e => codes.set(e.code, e));
  const cidService = new CidService("cid10.json");
  
  fastify.get<{Params: { ref: string }}>("/:ref", (req, res)=>{

    const { ref } = req.params;
    const result = cidService.query(ref);

    if(!result)
      throw fastify.httpErrors.notFound("referencia não encontrada!");

    res.send({ data: result });
      
    // const refUpper = ref.toUpperCase();

    // const r = [];

    // if(codes.has(refUpper.toUpperCase())){
    //   res.send(codes.get(refUpper.toUpperCase()));
    //   return;
    // }

    // for(const i of ascii){
    //   if(r.length > 20)
    //     throw fastify.httpErrors.badRequest("lista longa de resultado, detalhe a referencia!")
      
    //   if(i.valueUpper.includes(refUpper))
    //     r.push(i);
    // }

    // res.send(r);
  });
}
