import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, (req, res) => {
    res.json({
        message: "Welcome to dashboard",
        user: (req as any).user,
    });
});

export default router;