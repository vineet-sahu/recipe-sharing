import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import app from "./app";
import config from "./config";
import mongoose from "mongoose";

const PORT = config.port || 5000;

const server = createServer(app);


mongoose.connect(config.mongoURI)
.then(() => { console.log("MongoDB connected");

  console.log(`Environment: ${process.env.MONGODB_URI }`);
 })
.catch((err) => console.error("MongoDB connection error:", err));

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});