import type { FastifyInstance } from "fastify";

// type Payload = {
//   user_id: number;
//   data: string;
// }

export default function index(fastify:FastifyInstance){
  // const clients = new Set();

  fastify.get("/chat", { websocket: true }, function(socket, req){
    // socket.on("connect", (data: Buffer) => {
    //   console.log(data);
    // });

    socket.on("message", function(){
      socket.send("hi");
    });

  });

}
