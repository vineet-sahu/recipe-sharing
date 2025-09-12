import { Request, Response } from "express";
import authService from "../services/auth.service";
import { signToken, verifyToken } from "../utils/jwt.util";
import { errorResponse, successResponse } from "../utils/response.util";
import bcrypt from "bcryptjs";

  export const login =  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const foundUser = await authService.authenticate(email, password);
  
      if (foundUser) {
        const user = { _id: foundUser._id as string, email };
        const token = signToken(user);
    
        req.session.user = user;
        return successResponse(res, { token: token, user: user }, "Login successful");
      }
  
      return errorResponse(res, "Invalid credentials", 401);
      
    } catch (error) {
      return errorResponse(res, "Internal server error", 500, (error as Error).message);
    }
  
  };

  export const logout = (req: Request, res: Response) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return errorResponse(res, "Failed to logout", 500, err.message);
        }
      });
    }
    catch (error) {
      return errorResponse(res, "Internal server error", 500, (error as Error).message);
    }
  };
  
  export const session = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });
  
    const token = authHeader.split(" ")[1] || "";
    const decoded = verifyToken(token);
  
    if (!decoded) return errorResponse(res, "IInvalid or expired token", 401);
  
    return res.json({ user: decoded });
  };

  export const signup = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      const newUser = await authService.createUser({name, email, password: hashedPwd});
  
      return successResponse(res, { user: { id: newUser._id, email: newUser.email, name: newUser.name } }, "Login successful", 201);
    } catch (error) {

      return  errorResponse(res, "Internal server error", 500,  (error as Error).message);
    }
  };
