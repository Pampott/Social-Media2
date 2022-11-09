import express from "express";
import { createPost, deletePost, getPosts, getSinglePost, likePost, updatePost } from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.delete("/:id", deletePost);

router.put("/:id", updatePost);

router.put("/:id/like", likePost);

export default router;