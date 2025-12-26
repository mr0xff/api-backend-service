import type { FastifyInstance } from "fastify";
import { readFile } from "fs/promises";

export default async function index(fastify: FastifyInstance){
  fastify.log.warn("inicialização da rota ... ");

  const buf = await readFile("cid10.json");

  const ascii = JSON.parse(buf.toString()) as Array<{ code: string; value: string }>;

  const codes = new Map();

  ascii.forEach(e => codes.set(e.code, e));
  
  fastify.get("/:name", (req, res)=>{

    const { name } = req.params;

    const r = ascii.filter (e => {
      return (new RegExp(name, "ig"))
        .test(e.value)
    });
    
    if(r.length > 20)
      throw fastify.httpErrors.badRequest("A referencia de busca é curta demais!");

    if(!r.length)
      throw fastify.httpErrors.notFound("Referencia não encontrada!");

    res.send(r);
  })  
}
