import { FastifyInstance } from "fastify";

export default function index(fastify: FastifyInstance){
  const { service } = fastify;

  fastify.get("/api/users", async function(req, res){
    res.send(await service.user.list());
  });

  fastify.post<{ Body: { name: string }}>("/api/users", async function(req, res){
    const data = await service.user.create(req.body);
    res.code(201).send({ data });
  });
  
  fastify.get<{ Params: { id: string }}>("/api/users/:id/messages", async function(req, res){
    res.send(await service.messaging.read(req.params.id));
  });

  fastify.post<{ Body: {
    sender_id: string;
    receiver_id: string;
    body: string;
  }}>("/api/chat/", async function(req, res){
    const data = await service.messaging.write(req.body);
    res.code(201).send({ data });
  });
  
  // ... chat api
}