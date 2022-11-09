import express from "express";
import { deleteUser, follow, getUser, unfollow, update } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", update);
router.delete("/:id", deleteUser);
router.put("/:id/follow", follow);
router.put("/:id/unfollow", unfollow)

export default router;