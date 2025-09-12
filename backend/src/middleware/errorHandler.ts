import { Request, Response, NextFunction } from "express";

const errorhandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("Unhandled Error:", err);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
}


export default errorhandler;