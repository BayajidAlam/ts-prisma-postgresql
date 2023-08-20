import { Request, Response } from "express";
import { PostService } from "./post.service";

const insertIntoDb = async (req: Request, res: Response) => {
  
  try {
    const result = await PostService.insertIntoDb(req.body)
    res.send({
      success: true,
      message: "post successfully created",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  console.log(req.query);
  const options = req.query
  try {
    const result = await PostService.getAllPost(options)
    res.send({
      success: true,
      message: "post fetched successfully",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    res.send(error);
  }
};


export const PostController = {
  insertIntoDb,
  getAllPost
}