import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../../controller/categories/categories.controller.js";
import { authorizeUser } from "../../middlewares/auth.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import {
  createCategoriesSchema,
  updateCategoriesSchema,
} from "../../schema/zodauthentication.js";
import { USER_ROLE } from "../../config/enums/enums.js";

const categoryRouter = express.Router();
// #############################################
// @/categories
categoryRouter.get("/", getAllCategories);

// Single Get
categoryRouter.get("/:id", getSingleCategory);

categoryRouter.use(authorizeUser(USER_ROLE.ADMIN));
// Single Create
categoryRouter.post(
  "/",
  validationMiddleware(createCategoriesSchema),
  createCategory
);

// Single Update
categoryRouter.put(
  "/:id",
  validationMiddleware(updateCategoriesSchema),
  updateCategory
);

// Single Delete
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
