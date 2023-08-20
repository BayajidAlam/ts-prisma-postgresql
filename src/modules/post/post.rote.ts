import express from "express";
import { PostController } from "./post.controller";
const router = express.Router();

router.post("/create-post", PostController.insertIntoDb);
router.get("/", PostController.getAllPost);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get('/learn', PostController.learnAggregatedAndGrouping)
export const PostsRoutes = router;
