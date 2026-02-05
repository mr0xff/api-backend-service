import { FastifyInstance } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

export default function root(_fastify: FastifyInstance) {
  const fastify = _fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.post(
    "/",
    { schema: {
      body: { $ref: "userPost" }
    }},
    (req, res) => {
      const { name, age } = req.body;
      console.log(name, age);
      res.send();
    }
  )
}