import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  sessionSecret: process.env.SESSION_SECRET || "",
  jwtSecret: process.env.JWT_SECRET || "",
  mongoURI: process.env.MONGODB_URI || "",
  isProd: process.env.NODE_ENV === "production",
};

export default config;