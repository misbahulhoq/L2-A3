import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorPayload: { name: string; message?: string; errors: any } = {
    name: err.name,
    message: err.message,
    errors: err.errors,
  };

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation Error";
    errorPayload = {
      name: err.name,
      errors: err.errors,
    };
  }

  res.status(statusCode).json({ message, success: false, error: errorPayload });
};

export { errorHandler };
export default errorHandler;
