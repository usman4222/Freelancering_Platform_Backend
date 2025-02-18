import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
  updateStatus,
} from "../../controller/jobs/job.controller.js";
import { authorizeUser } from "../../middlewares/auth.middleware.js";
import { USER_ROLE } from "../../config/enums/enums.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { jobStatusSchema } from "../../schema/zodauthentication.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getJobById);

jobRouter.use(authorizeUser([USER_ROLE.ADMIN, USER_ROLE.CLIENT]));

jobRouter.post("/", createJob);
jobRouter.put("/:id", updateJob);
jobRouter.delete("/:id", deleteJob);
jobRouter.put(
  "/update-status/:id",
  validationMiddleware(jobStatusSchema),
  updateStatus
);

export default jobRouter;
