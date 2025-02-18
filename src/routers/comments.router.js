import express from "express";
import { authorizeUser } from "../middlewares/auth.middleware";
import { createComment } from "../controller/comments.controller";

const commentRouter = express.Router();

commentRouter.post("/", createComment);

export default commentRouter;
