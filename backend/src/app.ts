import express from "express";
import routes from "./routes";
import corsConfig from "./config/cors";
import sessionConfig from "./config/session";
import notFound from "./middleware/notFound";
import errorhandler from "./middleware/errorHandler";
import helmet from "helmet";
import rateLimiter from "./middleware/rateLimiter";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(corsConfig);
app.use(sessionConfig);
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use(notFound);
app.use(errorhandler);
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
