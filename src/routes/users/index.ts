import { FastifyInstance, FastifySchema, RouteGenericInterface } from "fastify";

interface PostRoute extends RouteGenericInterface {
  Body: {
    name: string;
    email: string;
  }
}

export default function index(fastify: FastifyInstance) {
  // fastify.addSchema({
  //   $id: "dataResponse",
  //   type: "object",
  //   properties: {
  //     data: { type: "" }
  //   }
  // });
  const { user: userServices } = fastify.service;

  fastify.get("/", async function(req, res){
    const users = await userServices.list();
    res.send({ data: users });
  });

  fastify.post<PostRoute>("/", async function (req, res) {
    const user = 
  })
}