import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  getSubCategoriesByCategory,
  updateSubCategory,
} from "../../controller/categories/subcategories.controller.js";
import { authorizeUser } from "../../middlewares/auth.middleware.js";
import { USER_ROLE } from "../../config/enums/enums.js";

const subCategoriesRouter = express.Router();

// ############## Sub Categories #################
subCategoriesRouter.get("/category/:id", getSubCategoriesByCategory);

// All sub
subCategoriesRouter.get("/", getAllSubCategories);

subCategoriesRouter.get("/:id", getSingleSubCategory);
// Single Get
subCategoriesRouter.use(authorizeUser(USER_ROLE.ADMIN));

subCategoriesRouter.post("/", createSubCategory);
// update sub
subCategoriesRouter.put("/:id", updateSubCategory);
// delete sub
subCategoriesRouter.delete("/:id", deleteSubCategory);

export default subCategoriesRouter;
