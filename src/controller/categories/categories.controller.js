import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { CategoryModel } from "../../models/categories.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title) {
    return next(new ErrorHandler("Title is required", 400));
  }

  // TODO : Check if category already exists

  const category = new CategoryModel({
    title: String(title),
    description: String(description),
  });

  const savedCateogry = await category.save();

  res
    .status(201)
    .json(ApiResponse(true, "Category created successfully", savedCateogry));
});

export const getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await CategoryModel.find();

  res
    .status(200)
    .json(ApiResponse(true, "Categories fetched successfully", categories));
});

export const getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category_id = req?.params?.id;

  const category = await CategoryModel.findById(category_id);

  res
    .status(200)
    .json(ApiResponse(true, "Category fetched successfully", category));
});

export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  const category_id = req?.params?.id;

  // Validate category ID
  if (!category_id) {
    throw new ErrorHandler("Category ID is required", 400, [
      "Category ID is required",
    ]);
  }

  const { title, description } = req.body;

  // Validate title
  if (!title) {
    throw new ErrorHandler("Title is required", 400, ["Title is required"]);
  }

  // Find category by ID
  const category = await CategoryModel.findById(category_id);
  if (!category) {
    throw new ErrorHandler("Category not found", 404, ["Category not found"]);
  }

  // Update category fields
  category.title = title;
  if (description) category.description = description;

  // Save the updated category
  const updatedCategory = await category.save();

  // Send response
  res
    .status(200)
    .json(ApiResponse(true, "Category updated successfully", updatedCategory));
});

export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category_id = req?.params?.id;

  await CategoryModel.findByIdAndDelete(category_id);

  res
    .status(200)
    .json(ApiResponse(true, "Category deleted successfully", null));
});
