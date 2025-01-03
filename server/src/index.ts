import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
import connectDataBase from "./config/mongodb";
import connectCloudinary from "./config/cloudinary";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";

// App Config
const app = express();
const port: number = 4000;
connectDataBase();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
