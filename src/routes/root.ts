import { FastifyInstance, FastifySchema } from "fastify";

export default function root(fastify: FastifyInstance) {
  const schema : FastifySchema = {
    body: {
      type: "object",
      properties: {
        username: { type: "string",enum: ["root", "samurai"] }
      }
    }
  } 

  fastify.post<{ Body: { username: string }}>("/", { schema }, (req, res) => {
    const { username } = req.body;
    fastify.log.warn({ username });

    res.send({ msg: "yes" });
  })
}