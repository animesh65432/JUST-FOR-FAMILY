import { Request, Response } from "express";
import { Users } from "../../Models";
import { StatusCodes } from "http-status-codes";
import bycrptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import ConfigFile from "../../config";

function createTokens(obj: object) {
  let token = jwt.sign(obj, ConfigFile.jsonwebtoken as string);

  return token;
}

const CreateTheUser = async (req: Request, res: Response) => {
  try {
    let { Name, Password, Email } = req.body;

    if (!Name || !Password || !Email) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        Msg: "please put each and everything",
      });
    }

    let CheckTheUser = await Users.findOne({
      where: {
        Email,
      },
    });

    if (CheckTheUser) {
      return res.status(StatusCodes.FORBIDDEN).json({
        Msg: "User has alredy has  been singup ",
      });
    }

    let hashPassword = await bycrptjs.hash(Password, 10);

    let NewUser = await Users.create({
      Name,
      Email,
      Password: hashPassword,
    });

    return res.status(StatusCodes.OK).json({
      Msg: "Sucessfully create the User",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      Msg: error,
    });
  }
};

const LoginTheUser = async (req: Request, res: Response) => {
  try {
    let { Email, Password } = req.body;

    let CheckTheUser = await Users.findOne({
      where: {
        Email,
      },
    });

    if (!CheckTheUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        Msg: "user is not singnup yet",
      });
    }

    let CheckPassword = await bycrptjs.compare(Password, CheckTheUser.Password);

    if (!CheckPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        Msg: "Password is wrong",
      });
    }

    let token = createTokens({ Email });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 1000,
      secure: true,
      httpOnly: true,
    });
    return res.status(StatusCodes.OK).json({
      Msg: "Sucessfully login",
      token,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      MsG: error,
    });
  }
};

export { CreateTheUser, LoginTheUser };
