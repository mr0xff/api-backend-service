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
    
    });
  });

  fastify.all("/someroute", (req, res)=>{
    res.send({ msg: "I'm service 01" });
  });
  

  fastify.get("/list_notes", async function(req, res){
    const client = await fastify.pg.connect();

    const { rows } = await client.query("select * from notes_tb");
    
    client.release();
    res.send(rows);
  });

  fastify.post("/add_note", async function(req, res){

  });
}
