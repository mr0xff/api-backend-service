import { FastifyInstance, FastifySchema, RouteGenericInterface } from "fastify";
import { TaskDTO } from "../lib/dto.js";

interface TaskPost extends RouteGenericInterface {
  Body: {
    title: string;
    completed: boolean;
  }
}

export default function root(fastify: FastifyInstance) {
  const { JsonResponse } = fastify.dto;
  fastify.addSchema({
    $id: "taskPost",
    type: "object",
    properties: {
      title: { type: "string" },
      completed: { type: "boolean" }
    }
  });


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
  });

  fastify.post<TaskPost>("/tasks", { schema: { body: { $ref: "taskPost" }} } ,(req, res) => {
    const task = new TaskDTO(req.body.title, req.body.completed);

    res.code(201).send(new JsonResponse({
      data: task,
      message: "created!",
      status: true
    }));
  });

}