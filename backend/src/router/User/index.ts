import { Router } from "express";
import Controllers from "../../controllers";

const UserRouter = Router();

UserRouter.post("/Create", Controllers.User.CreateTheUser);
UserRouter.post("Login", Controllers.User.LoginTheUser);

export default UserRouter;
