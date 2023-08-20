import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const insertIntoDb = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.insertIntoDb(req.body)
    res.send({
      success: true,
      message: "category successfully created",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};


export const CategoryController = {
  insertIntoDb,
}