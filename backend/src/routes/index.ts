
import {Router} from "express";
import authRoutes from "./auth.routes";
import recipeRoutes from "./recipe.routes";
import commentRoutes from "./comment.routes";
import ratingRoutes from "./rating.routes";


const routes =  Router();

routes.use("/auth", authRoutes);
routes.use("/recipes", recipeRoutes);
routes.use("/comments", commentRoutes);
routes.use("/ratings", ratingRoutes);   


export default routes;