import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  // image: {
  //   type: String,
  // },
});

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const SubCategoryModel = mongoose.model(
  "SubCategory",
  subCategorySchema
);

export const CategoryModel = mongoose.model("Category", categorySchema);
