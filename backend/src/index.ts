import ConfigFile from "./config";
import express from "express";

const app = express();

app.listen(ConfigFile.Port);
