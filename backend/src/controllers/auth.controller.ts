import { Request, Response } from "express";
import authService from "../services/auth.service";
import { signToken, verifyToken } from "../utils/jwt.util";
import { errorResponse, successResponse } from "../utils/response.util";
import bcrypt from "bcryptjs";


  declare module "express-session" {
    interface SessionData {
      user?: {
        _id: string;
        email: string;
      };
    }
  }

  export const login =  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const foundUser = await authService.authenticate(email, password);
  
      if (foundUser) {
        const user = { _id: foundUser._id as string, email };
        const token = signToken(user);
    
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", 
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return successResponse(res, { token: token, user: user }, "Login successful");
      }
  
      return errorResponse(res, "Invalid credentials", 401);
      
    } catch (error) {
      return errorResponse(res, "Internal server error", 500, (error as Error).message);
    }
  
  };

  export const logout = (req: Request, res: Response) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    }
    catch (error) {
      return errorResponse(res, "Internal server error", 500, (error as Error).message);
    }
  };
  
  export const session = (req: Request, res: Response) => {


    const user = (req as any).user;

    if (!user) return res.status(401).json({ message: "No token provided" });
  
    return res.json({ user: user });
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
