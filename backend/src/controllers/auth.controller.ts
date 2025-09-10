import { Request, Response } from "express";
import authService from "../services/auth.service";
import { signToken, verifyToken } from "../utils/jwt.util";


declare module "express-session" {
    interface SessionData {
      user?: {
        _id: string;
        email: string;
        name?: string;
      };
    }
  }

  export const login =  async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        missing: {
          email: !email ? "Email is required" : undefined,
          password: !password ? "Password is required" : undefined,
        },
      });
    }
  
    // Replace with DB 
    const foundUser = await authService.authenticate(email, password);

    // debugger;
    if (foundUser) {
      const user = { _id: foundUser._id as string, email };
      const token = signToken(user);
  
      req.session.user = user;
      return res.json({ 
        success: true, 
        message: "Login successful", 
        token, // send JWT
        user: { id: foundUser._id, email: foundUser.email }, 
    });
    }
  
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  };

  export const logout = (req: Request, res: Response) => {
    return res.json({ message: "Logout successful. Please delete the token on client side." });
  };
  
  //
  export const session = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });
  
    const token = authHeader.split(" ")[1] || "";
    const decoded = verifyToken(token);
  
    if (!decoded) return res.status(401).json({ message: "Invalid or expired token" });
  
    return res.json({ user: decoded });
  };


  export const signup = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Name, email and password are required",
          missing: {
            name: !name ? "Name is required" : undefined,
            email: !email ? "Email is required" : undefined,
            password: !password ? "Password is required" : undefined,
          },
        });
      }
      const newUser = await authService.createUser({name, email, password});
  
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: { id: newUser._id, email: newUser.email, name: newUser.name },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };
