import ConfigFile from "./config";
import database from "./db";
import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database
  .sync()
  .then((res) => {
    console.log(res);
    app.listen(ConfigFile.Port, () => {
      console.log(`Sucessfully listen the port`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
