import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import PostRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use("/posts", PostRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello To Memeories API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`))
  )
  .catch((err) => console.log(err.message));
