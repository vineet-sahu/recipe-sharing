import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import User from "../models/User";

export const authenticateJWT = async(req: Request, res: Response, next: NextFunction) => {

  try {
    const token = req.cookies?.auth_token;

    console.log("Token from cookies:", req.cookies);
    console.log("Token from cookies auth_token:", req.cookies?.auth_token);
  
    if (!token) return res.status(401).json({ message: "No token provided" });
    
    const decoded = verifyToken(token) as {_id:  string, email: string};
  
    const user = await User.findById(decoded._id);  
  
    if (!decoded) return res.status(401).json({ message: "Invalid or expired token" });
  
    (req as any).user = user;
    next();
  } catch (error) {
    
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
