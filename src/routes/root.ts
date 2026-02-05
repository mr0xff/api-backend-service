import { FastifyInstance, FastifySchema, RouteGenericInterface } from "fastify";
import { Task } from "../lib/dto.js";

interface TaskPost extends RouteGenericInterface {
  Body: {
    title: string;
    completed: boolean;
  }
}

export default function root(fastify: FastifyInstance) {
  fastify.addSchema({
    $id: "taskPost",
    type: "object",
    properties: {
      title: { type: "integer" },
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

  fastify.addHook("onClose", (req, done) => {
    fastify.log.warn("request canceled by user");
    done();
  });

  fastify.post<TaskPost>("/tasks", { schema: { body: { $ref: "taskPost" }} } ,(req, res) => {
    const task = new Task(req.body.title, req.body.completed);
    fastify.log.warn(task);
    console.log(task);
    res.code(201).send();
  });
}