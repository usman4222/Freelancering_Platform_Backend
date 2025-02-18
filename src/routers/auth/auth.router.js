import express from "express";
import {
  login,
  registerAdmin,
  registerClient,
  registerFreelancer,
  sendOTP,
  verifyClient,
  verifyFreelancer,
} from "../../controller/auth.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../../schema/zodauthentication.js";
import upload from "../../middlewares/upload.file.js";

const authRouter = express.Router();
//Client
authRouter.post(
  "/signup-client",
  validationMiddleware(registerSchema),
  registerClient
);
authRouter.get("/verify-client", verifyClient);
authRouter.post('/send-otp', sendOTP);
//Freelancer
authRouter.post(
  "/signup-freelancer",
  upload.single("image"),
  validationMiddleware(registerSchema),
  registerFreelancer
);
//Admin
authRouter.post(
  "/register-admin",
  upload.single("image"),
  validationMiddleware(registerSchema),
  registerAdmin
);

authRouter.get("/verify-freelancer", verifyFreelancer);
authRouter.post("/login", validationMiddleware(loginSchema), login);

export default authRouter;
