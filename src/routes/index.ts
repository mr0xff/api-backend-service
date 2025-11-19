import type { FastifyInstance, RouteGenericInterface } from "fastify";


interface SqlRoute extends RouteGenericInterface {
  Querystring: {
    id: number;
  },
  Params: {
    id: number;
  }
}
export default async function index(fastify:FastifyInstance){
  const db = await fastify.pg.connect();

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

  fastify.all<SqlRoute>("/sql_query", async function(req, res){
    debugger;
    
    const { id } = req.query;

    const { rows } = await db.query("SELECT name FROM users_tb where id=$1", [id]);

    res.send(rows.at(0));
  });

  fastify.all<SqlRoute>("/sql_params/:id", async function(req, res){
    const { id } = req.params;

    const { rows } = await db.query("SELECT name FROM users_tb where id=$1", [id]);

    res.send(rows.at(0));
  })
}