import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cart.controller";
import authUser from "../middleware/auth";

const cartRouter = express.Router();

cartRouter.post("/get", getUserCart);
cartRouter.post("/add", addToCart);
cartRouter.post("/update", updateCart);

export default cartRouter;
