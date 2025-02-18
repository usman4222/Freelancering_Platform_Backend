import express from "express";
import {
  createBid,
  deleteBid,
  getAllBids,
  getBidById,
  updateBid,
} from "../controller/bid.controller.js";

import { USER_ROLE } from "../config/enums/enums.js";

import { authorizeUser } from "../middlewares/auth.middleware.js";

const bidRouter = express.Router();

bidRouter.get("/", getAllBids);

bidRouter.get("/:id", getBidById);

bidRouter.use(authorizeUser([USER_ROLE.FREELANCER]));

bidRouter.post("/", createBid);

bidRouter.put("/:id", updateBid);

bidRouter.delete("/:id", deleteBid);

export default bidRouter;
