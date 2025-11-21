import type { FastifyInstance } from "fastify";

export default function index(fastify:FastifyInstance){

  fastify.get("/webhook", { websocket: true }, function(sock, req){
    sock.on("message", msg => {

      fastify.websocketServer.emit("test", msg.toString());

      console.log(msg.toString());
    });
  });

  fastify.get("/chat", { websocket: true }, function(sock, req){
    fastify.websocketServer.addListener("test", (data)=>{
      sock.send(data);
    })
  })
}
