import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cart.controller";
import authUser from "../middleware/auth";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
