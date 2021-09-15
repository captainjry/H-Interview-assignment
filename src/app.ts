import express, { Application, Request, Response } from "express";
import { Database } from "./database";

export const app: Application = express();

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/vaccine", async (req: Request, res: Response) => {
  // fix this please
  let query = Object.keys(req.query).reduce((mappedQuery, key) => {
    let param = req.query[key];
    if (key === "doctor") {
      mappedQuery["assignedDoctor"] = req.query.doctor;
    } else {
      mappedQuery[key] = param;
    }

    return mappedQuery;
  }, {});
  const result = Database.find(query); // Database Example
  if (Array.isArray(result) && result.length) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Not found");
  }
});
