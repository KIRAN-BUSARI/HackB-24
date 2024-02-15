import app from "./app.js";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/index.js";
config({
    path: ".env"
});

app.use(cors({
    // origin: [process.env.FRONTEND_URL],
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.json("Hello HackB-24!");
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️ Server running on port http://localhost:${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection Failed", err);
    })