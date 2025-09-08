import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { addOrUpdateRating } from "../controllers/rating.controllers";


const router = Router();
router.post("/rate", authenticateJWT, addOrUpdateRating);

export default router;

