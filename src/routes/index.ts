import { FastifyInstance } from "fastify";
import JobService from "../services/job.js";

export default function index(fastify: FastifyInstance){
  new JobService;
  
  fastify.get("/", (req, res)=>{
    res.send({ msg: "hi" })
  })
}