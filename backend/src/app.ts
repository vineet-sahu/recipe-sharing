import express from "express";
import session from "express-session";
import authRoutes from "./routes/auth.routes";
import recipeRoutes from "./routes/recipe.routes";
import commentRoutes from "./routes/comment.routes";
import ratingRoutes from "./routes/rating.routes";
import config from "./config";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies / auth headers
  })
)

app.use(express.json());

// Session setup
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ratings", ratingRoutes);



app.use((req, res, next)=>{
    res.status(404).json({     
        success: false,
        message: "Route not found",
        path: req.originalUrl, });
    next();
})

// Global error handler
app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error("Unhandled Error:", err);
  
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    }
 );

export default app;
