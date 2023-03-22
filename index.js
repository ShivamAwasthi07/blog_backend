import express from "express";
import mongoose from "mongoose";
import { config } from "./config/default"; 
const app = express();

(async () => {
    try {
      const db = `mongodb+srv://${config.cloudDb.dbuname}:${config.
        cloudDb.dbpwd
      }@${config.cloudDb.cluster}/${config.cloudDb.dbname}?retryWrites=true&w=majority`;
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to Database");
      const port = config.port;
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log(`App is on: ${config.env} Mode`);
      });
    } catch (err) {
      console.log(err);
    }
  })();

  app.get("/", async (req, res) => {
    try {
        res.status(404).json({
        statusCode: "SUCCESS",
        statusValue: 200,
        message: "Requested url is not available..",
      });
    } catch (err) {
      res.status(500).json({
        statusCode: "ERROR",
        statusValue: 500,
        messages: `The Server was unable to complete your request. ${err}`,
      });
    }
  });