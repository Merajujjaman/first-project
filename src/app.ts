import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes";
import cookieParser from "cookie-parser";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
}));

app.use(cookieParser());


//app routers
// app.use("/api/v1/students", studentRouts)
// app.use("/api/v1/users", userRouts)

app.use("/api/v1", router)

const test = (req: Request, res: Response) => {
  const a = "Hello developer!!";
  res.send(a);
}

app.get("/", test);

//global error handler:
app.use(globalErrorHandler)

// not found rout:
app.use(notFound)

export default app;

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// console.log(process.cwd());
// F:\level-2-ph-project\first-project/.env
