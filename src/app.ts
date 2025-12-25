import express from "express";
import cors from "cors";
import healthRoute from "@/routes/health.route";
import helloRoute from "@/routes/hello.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRoute);
app.use("/api", helloRoute);

export default app;
