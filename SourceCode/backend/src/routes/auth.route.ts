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
        console.log("Client ID:", process.env.OPENID_CLIENT_ID);
        console.log("Client SECRET:", process.env.OPENID_CLIENT_SECRET);
        console.log("Redirect URI:", process.env.OPENID_REDIRECT_URI);
        console.log("Code:", code);

        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", process.env.OPENID_REDIRECT_URI!);
        params.append("client_id", process.env.OPENID_CLIENT_ID!);
        params.append("client_secret", process.env.OPENID_CLIENT_SECRET!);

        const tokenRes = await axios.post(
            "https://id-dev.mindx.edu.vn/token",
            params.toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        console.log("TOKEN RESPONSE:", tokenRes.data);

        const { id_token } = tokenRes.data;

        const appToken = jwt.sign(
            { id_token },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.json({ token: appToken });
    } catch (err: any) {
        console.error("TOKEN ERROR:", err.response?.data || err.message);
        res.status(401).json({
            message: "OpenID authentication failed",
            detail: err.response?.data,
        });
    }
});

export default router;