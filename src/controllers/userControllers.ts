import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import { ErrorResponse, SuccessResponse } from "../utils/responses";
import jwt from "jsonwebtoken";

const generateAuthToken = (user: any) => {
  return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || "secret");
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 8);
    await user.save();
    const token = generateAuthToken(user);
    return SuccessResponse(res, 201, "user created sucessfully", { user, token });
  } catch (error) {
    return ErrorResponse(res, 400, "could not create user", error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return ErrorResponse(res, 400, "Unable to login", { error: "Unable to login" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return ErrorResponse(res, 400, "Unable to login", { error: "Unable to login" });
    }
    const token = generateAuthToken(user);
    return SuccessResponse(res, 200, "user logged in", { user, token });
  } catch (error) {
    return ErrorResponse(res, 500, "Unable to login", error);
  }
};
