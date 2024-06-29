import "dotenv/config";

const ConfigFile = {
  Port: process.env.port,
  username: process.env.user,
  password: process.env.password,
  host: process.env.host,
};

export default ConfigFile;
