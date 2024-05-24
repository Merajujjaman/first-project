// const express = require('express')
import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const a = "Hello world!!";

  res.send(a);
});

export default app;

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// console.log(process.cwd());
// F:\level-2-ph-project\first-project/.env
