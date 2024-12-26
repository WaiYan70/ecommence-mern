import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";

const app = express();
const port: number = 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
