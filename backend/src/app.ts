import express from "express";
import session from "express-session";
import cors from "cors";
import healthRoute from "./routes/health.route";
import helloRoute from "./routes/hello.route";
import authRouter from "./routes/auth.route";

const app = express();

app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "sid",
        secret: "mindx-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
        },
    })
);

app.use("/", healthRoute);
app.use("/api", helloRoute);
app.use("/api", authRouter);

export default app;