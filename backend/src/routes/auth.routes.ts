import { Router } from "express";
// import { isAuthenticated } from "../middleware/auth.middleware";
import { login, logout, session } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/session", authenticateJWT, session);

export default router;
