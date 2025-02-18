// Sub Category
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { SubCategoryModel } from "../../models/categories.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createSubCategory = catchAsyncErrors(async (req, res, next) => {
  const { title, description, parent_id } = req.body;

  if (!title) throw new ErrorHandler("Title is required", 400);
  const subCategory = new SubCategoryModel({
    title: String(title),
    description: String(description),
    category: parent_id,
  });

  const savedSub = await subCategory.save();

  res
    .status(201)
    .json(ApiResponse(true, "Subcategory Created Successfully!", savedSub));
});

export const getAllSubCategories = catchAsyncErrors(async (req, res, next) => {
  const subCategories = await SubCategoryModel.find().populate("category");

  res
    .status(200)
    .json(
      ApiResponse(true, "Subcategories fetched successfully", subCategories)
    );
});

export const getSingleSubCategory = catchAsyncErrors(async (req, res, next) => {
  const subCategory_id = req?.params?.id;

  const subCategory = await SubCategoryModel.findById(subCategory_id);

  res
    .status(200)
    .json(ApiResponse(true, "Subcategory fetched successfully", subCategory));
});

// Get All Sub Categories of specific Category
export const getSubCategoriesByCategory = catchAsyncErrors(
  async (req, res, next) => {
    const category_id = req?.params?.id;

    const subCategories = await SubCategoryModel.find({
      category: category_id,
    });

    console.log(category_id);
    res
      .status(200)
      .json(
        ApiResponse(true, "Subcategories Fetched Successfully", subCategories)
      );
  }
);

export const updateSubCategory = catchAsyncErrors(async (req, res, next) => {
  const subCategory_id = req?.params?.id;

  const { title, description } = req.body;

  if (!title) throw new ErrorHandler("Title is required", 400);

  const subCategory = await SubCategoryModel.findById(subCategory_id);

  subCategory.title = title;
  subCategory.description = description;

  const updatedSubCategory = await subCategory.save();

  res
    .status(200)
    .json(
      ApiResponse(true, "Subcategory updated successfully", updatedSubCategory)
    );
});

export const deleteSubCategory = catchAsyncErrors(async (req, res, next) => {
  const subCategory_id = req?.params?.id;

  await SubCategoryModel.findByIdAndDelete(subCategory_id);

  res
    .status(200)
    .json(ApiResponse(true, "Subcategory deleted successfully", null));
});
