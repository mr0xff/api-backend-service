import { FastifyInstance } from "fastify";

export default function html(fastify: FastifyInstance){
  fastify.get("/", (req, res)=>{
    res.view("index.pug");
  });

  fastify.get("/login", (req, res)=>{
    res.view("login.pug");
  });

  fastify.post<{ Body: { email: string, pwd: string }}>("/", (req, res)=>{
    const { pwd } = req.body;
    console.log(pwd);
    
    res.redirect("/html/home");
  });

  fastify.get("/home", (req, res)=>{
    res.view("home.pug", { user: "test" });
  })
}