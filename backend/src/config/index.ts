import "dotenv/config";
const ConfigFile = {
  Port: process.env.port,
  username: process.env.user,
  password: process.env.password,
  host: process.env.host,
  jsonwebtoken: process.env.jsonwebtoken,
  database: process.env.database,
};

export default ConfigFile;
