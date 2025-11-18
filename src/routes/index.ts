import type { FastifyInstance, RouteGenericInterface } from "fastify";


interface SqlRoute extends RouteGenericInterface {
  Querystring: {
    id: number;
  }
}
export default async function index(fastify:FastifyInstance){

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
  });

  fastify.all<SqlRoute>("/sql", async function(req, res){
    const db = await fastify.pg.connect();

    const { id } = req.query;
    
    fastify.log.warn(id);

    const { rows } = await db.query(
      "SELECT name FROM users_tb WHERE id=$1", [id]
    );
    
    db.release()
    res.send(rows.at(0));
  });
}