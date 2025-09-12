import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err: ValidationError) => {
        if ("param" in err) {
          return {
            field: err.param,
            message: err.msg
          };
        }
        return { field: "unknown", message: err.msg };
      })
    });
  }
  next();
};
