import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const USER = {
    username: "admin",
    password: "123456",
};

const JWT_SECRET = process.env.JWT_SECRET!;

// ================== LOGIN ==================
router.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username !== USER.username || password !== USER.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { username },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return res.json({ token });
});

// ================== DASHBOARD (PROTECTED) ==================
router.get("/dashboard", (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.json({ user: decoded });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
});

// ================== LOGOUT ==================
router.post("/logout", (_req: Request, res: Response) => {
    return res.json({ message: "Logout success (client deletes token)" });
});

export default router;