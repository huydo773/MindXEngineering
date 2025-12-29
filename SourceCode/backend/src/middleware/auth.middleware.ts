import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
    jwksUri: "https://id-dev.mindx.edu.vn/.well-known/jwks.json",
});

function getKey(header: any, callback: any) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key?.getPublicKey();
        callback(err, signingKey);
    });
}

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.path === "/api/auth/openid") {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        getKey,
        {
            algorithms: ["RS256"],
            issuer: "https://id-dev.mindx.edu.vn",
            audience: "mindx-onboarding",
        },
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token", err });
            }
            (req as any).user = decoded;
            next();
        }
    );
}