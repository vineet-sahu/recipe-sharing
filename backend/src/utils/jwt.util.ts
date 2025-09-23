import config from "../config";
import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';


export const signToken = (payload: object, expiresIn = "1h") => {
    return jwt.sign(payload, config.sessionSecret, { expiresIn: "1h" });;
  };
  
  export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, config.sessionSecret);
    } catch (err) {
      return null;
    }
  };
