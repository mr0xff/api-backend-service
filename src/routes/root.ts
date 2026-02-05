import { FastifyInstance } from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

export default function root(_fastify: FastifyInstance) {
  const fastify = _fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.post(
    "/",
    { schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "integer", minLength: 0 }
        },
        required: ["name", "age"]
      }
    }},
    (req, res) => {
      const { name, age } = req.body;
      console.log(name, age);
      res.send();
    }
  )
}