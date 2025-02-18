import multer from "multer";
import path from "path";
import fs from "fs";
import ErrorHandler from "./errorHandler.js";

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const uploadDir = "./uploads/images";
ensureDirectoryExists(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isMimeTypeValid = allowedTypes.test(file.mimetype);

  if (isValid && isMimeTypeValid) {
    cb(null, true);
  } else {
    cb(new ErrorHandler("Only images (jpeg, jpg, png, webp) are allowed!"));
  }
};

// Initialize Multer
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

export default upload;
