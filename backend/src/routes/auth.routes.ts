import { Router } from "express";
import { login, logout, signup, session } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { loginValidator, signUpValidator } from "../validators/auth.validator";

const router = Router();

router.post("/login", loginValidator, validate, login);
router.post("/signup", signUpValidator, validate, signup);
router.post("/logout", logout);
router.get("/session", authenticateJWT, session);

export default router;
