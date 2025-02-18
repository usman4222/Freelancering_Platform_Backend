import express from "express";
import { updateClientProfile } from "../../controller/client/client_profile.controller.js"; // Adjust the path to your controller
import { clientProfileValidationSchema } from "../../schema/zodauthentication.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { authorizeUser } from "../../middlewares/auth.middleware.js";
import { USER_ROLE } from "../../config/enums/enums.js";

const clientProfileRouter = express.Router();

// POST route for creating a client
clientProfileRouter.put("/", authorizeUser([USER_ROLE.CLIENT]), validationMiddleware(clientProfileValidationSchema), updateClientProfile);

export default clientProfileRouter;
