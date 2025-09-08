import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import User from "../models/User";

export const authenticateJWT = async(req: Request, res: Response, next: NextFunction) => {

  try {
    const authHeader = req.headers.authorization;
    console.log("req.headers", req.headers);
  
    console.log("authHeader", authHeader);
  
    if (!authHeader) return res.status(401).json({ message: "No token provided" });
  
    console.log("after authHeader", authHeader);
  
    const token = authHeader.split(" ")[1] || "";
    const decoded = verifyToken(token) as {_id:  string, email: string};

    console.log("after decode authHeader", decoded);

  
    const user = await User.findById(decoded._id);
  
    console.log("after find===================", user);
  
  
    if (!decoded) return res.status(401).json({ message: "Invalid or expired token" });
  
    (req as any).user = user;
    next();
  } catch (error) {
    
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
