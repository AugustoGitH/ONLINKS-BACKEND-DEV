import "./bootstrap";
import "./database";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import upload from "./config/upload";
import routes from "./routes";

import { AppError } from "./helpers/errors/AppError";
import bodyParser from "body-parser";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
    // allowedHeaders: ["content-type"],
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "100000mb" }));
app.use("/public", express.static(upload.directory));

app.use("/api", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);

  return res.status(500).json({ message: "Internal server error" });
});

export default app;
