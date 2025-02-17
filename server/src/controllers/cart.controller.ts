import { Request, Response } from "express";
import userModel from "../models/user.model";

// Add product to User Cart
const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Added to Cart Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Add to Cart" });
  }
};

// Update User Cart Data
const updateCart = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, size, quality } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quality;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Cart Updated Succcessful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Update Cart" });
  }
};

// Get User Cart Data
const getUserCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to Get Cart Data" });
  }
};

export { addToCart, updateCart, getUserCart };
