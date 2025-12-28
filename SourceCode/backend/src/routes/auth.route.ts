import { Router } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * POST /api/auth/openid
 * body: { code }
 */
router.post("/openid", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: "Missing authorization code" });
    }

    try {
        const tokenRes = await axios.post(
            "https://id-dev.mindx.edu.vn/oauth2/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: process.env.OPENID_REDIRECT_URI!,
                client_id: process.env.OPENID_CLIENT_ID!,
                client_secret: process.env.OPENID_CLIENT_SECRET!,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { id_token } = tokenRes.data;

        const appToken = jwt.sign(
            { id_token },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.json({ token: appToken });
    } catch (err: any) {
        console.error(err.response?.data || err.message);
        res.status(401).json({ message: "OpenID authentication failed" });
    }
});

export default router;