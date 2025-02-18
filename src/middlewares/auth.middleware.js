import { USER_ROLE } from "../config/enums/enums.js";
import { UserModel } from "../models/user.model.js";
import { decodeJwtToken, verifyJwtToken } from "../utils/jwt.helper.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorHandler.js";

export const authMiddleware = catchAsyncErrors(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    req.user = null;
    return next();
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  const decoded = decodeJwtToken(token);

  if (decoded === null) {
    req.user = null;
    return next();
  }

  const user = await UserModel.findOne({ email: decoded.email });

  req.user = user;

  return next();
});

export const authorizeUser = (roles = []) => {
  return catchAsyncErrors(async (req, res, next) => {
    if (req?.user?.isVerified === false) {
      return next(new ErrorHandler("Please verify your account", 403));
    }

    if (roles.length === 0 && req.user === null) {
      return next(new ErrorHandler("Permission denied", 403));
    }

    if (roles.length === 0 && req.user !== null) {
      next();
    }

    console.log(req?.user?.role);

    console.log(roles, USER_ROLE[req?.user?.role]);

    const isIncluded = roles.includes(USER_ROLE[req?.user?.role]);

    if (!isIncluded) {
      return next(new ErrorHandler("Permission denied", 403));
    }

    next();
  });
};
