import database from "../../db";
import { Model, DataTypes } from "sequelize";

type UserTypes = {
  Id?: number;
  Name: string;
  Email: string;
  Password: string;
};

interface UserInterFaces extends Model<UserTypes>, UserTypes {}
const Users = database.define<UserInterFaces>("Users", {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Users;
