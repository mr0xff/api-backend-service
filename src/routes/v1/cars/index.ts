import { FastifyInstance, FastifySchema } from "fastify";
import { randomUUID } from "node:crypto";

type Car = {
  model: string;
  name: string;
  price: number;
}

const carsFackDb = new Map<string, Car>();

const registerCardSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      model: { type: "string" },
      name: { type: "string" },
      price: { type: "number" }
    },
    required: ["model", "name"]
  },
  response: {
    201: {
      type: "object",
      properties: {
        msg: { type: "string" }
      }
    }
  }
}

export default async function cars(fastify: FastifyInstance){
  
  fastify.get("/", function(req, res){
    res.send(carsFackDb.values());
  });

  fastify.post("/", { schema: registerCardSchema }, function(req, res){
    const {
      model,
      name,
      price
    } = req.body as { name: string; model: string; price: number };

    const carId = randomUUID().toString();

    carsFackDb.set(carId, {
      model,
      name,
      price
    });

    res.code(201).send({
      msg: "registrado com sucesso!",
      carId
    });
  })
}