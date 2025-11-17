import type { FastifyInstance } from "fastify";

export default function index(fastify:FastifyInstance){
  fastify.all("/event_timer", function(_, res){
    const timing = (new Date).toISOString().split("T")[1].split(/[:\.]/gi).splice(0, 3) as [ string, string, string ];
    
    fastify.log.info(timing.toString(), "test");

    res.send({
      date: new Date(),
      int: Date.now(),
      hour: timing[0],
      minute: timing[1],
      second: timing[2]
    })
  })
}