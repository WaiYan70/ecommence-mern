import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
import connectDataBase from "./config/mongodb";
import connectCloudinary from "./config/cloudinary";

const app = express();
const port: number = 4000;
connectDataBase();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
