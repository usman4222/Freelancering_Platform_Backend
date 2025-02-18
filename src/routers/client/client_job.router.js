import express from "express";
import clientProfileRouter from "./client_profile.router.js";

const clientjob = express.Router();

clientjob.use("/profile", clientProfileRouter);

export default clientjob;
