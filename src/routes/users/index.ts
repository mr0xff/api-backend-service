import { FastifyInstance, RouteGenericInterface } from "fastify";

interface PostRoute extends RouteGenericInterface {
  Body: {
    name: string;
    email: string;
  }
}

export default function index(fastify: FastifyInstance) {
  const { user: userService } = fastify.service;
  const { User: UserDTO } = fastify.dto;

  fastify.get("/", async function(req, res){
    const users = await userService.list();
    res.send({ data: users });
  });

  fastify.post<PostRoute>("/", async function (req, res) {
    const user = new UserDTO(
      null,
      req.body.name,
      req.body.email,
      []
    );
    
    console.log(user);

    const data = await userService.create(user);
    res.code(201).send({ data });
  })
}