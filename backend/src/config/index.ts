import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  sessionSecret: process.env.SESSION_SECRET || "supersecret",
    // JWT secret
  jwtSecret: process.env.JWT_SECRET || "jwt_supersecret",
  mongoURI: process.env.MONGO_URI || "mongodb://mindfire:password@localhost:27017/sharemyrecipe?authSource=admin",
};

export default config;