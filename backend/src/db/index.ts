import ConfigFile from "../config";
import { Sequelize } from "sequelize";

const database = new Sequelize({
  username: ConfigFile.username,
  password: ConfigFile.password,
  host: ConfigFile.host,
  dialect: "mysql",
});

export default database;
