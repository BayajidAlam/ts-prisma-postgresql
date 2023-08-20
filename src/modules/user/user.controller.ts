import { Request, Response } from "express";
import { UserService } from "./user.service";

const insertIntoDb = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertIntoDb(req.body);
    res.send({
      success: true,
      message: "user successfully created",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "user profile created/updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsers();
    res.send({
      success: true,
      message: "data fetched successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUsers(parseInt(req.params.id));
    res.send({
      success: true,
      message: "data fetched successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};




export const UserController = {
  insertIntoDb,
  insertOrUpdateProfile,
  getUsers,
  getSingleUsers
}