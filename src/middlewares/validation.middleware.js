import { ZodError } from "zod";
import ErrorHandler from "./errorHandler.js";

function validationMiddleware(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.reduce((acc, issue) => {
          const path = issue.path.join(".");
          acc[path] = `${path} is ${issue.message}`;
          return acc;
        }, {});

        throw new ErrorHandler("Validation Error", 403, errorMessages);
      } else {
        throw new Error();
      }
    }
  };
}

export default validationMiddleware;
