import { Request, Response, NextFunction } from "express";


const notFound = (req: Request, res: Response, next: NextFunction)=>{
    console.log("Route not found====");
    res.status(404).json({     
        success: false,
        message: "Route not found",
        path: req.originalUrl, });
    next();
}

export default notFound;