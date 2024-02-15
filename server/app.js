import express from "express";
import cookieparser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())
// User Routes
app.use("/api/v1/users", userRoutes);

export default app;