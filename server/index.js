import app from "./app.js";
import { config } from "dotenv";

import morgan from "morgan";
import connectDB from "./db/index.js";
config({
    path: ".env"
});


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