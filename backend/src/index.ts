import ConfigFile from "./config";
import database from "./db";
import express from "express";
import { UserRouter } from "./router";
import cors from "cors";

const app = express();
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/User", UserRouter);

database
  .sync()
  .then((res) => {
    app.listen(ConfigFile.Port, () => {
      console.log(`Sucessfully listen the port${ConfigFile.Port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
