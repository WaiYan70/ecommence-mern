import { Request, Response } from "express";
import userModel from "../models/user.model";

interface CartItem {
  [size: string]: number;
}

interface CartData {
  [itemId: string]: CartItem;
}

// Add product to User Cart
const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, itemId, size } = req.body;
    if (!userId || !itemId || !size) {
      res.status(400).json({
        success: false,
        message: "Missing required fields: userId, itemId or size",
      });
      return;
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    let cartData: CartData = (await userData.cartData) || {};
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({
      success: true,
      message: "Added to Cart Successfully",
      cartData: cartData[itemId],
    });
  } catch (error) {
    console.error("Add to Cart's Function Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to Add to Cart",
      error: error instanceof Error ? error.message : "Unknown Error Occurred",
    });
  }
};

// Update User Cart Data
const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, itemId, size, quatity } = req.body;
    if (!userId || !itemId || !size || typeof quatity !== "number") {
      res.status(400).json({
        success: false,
        message: "Missing or invilad required fields",
      });
      return;
    }
    if (quatity < 0) {
      res.status(400).json({
        success: false,
        message: "Quatity can not be negative",
      });
      return;
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    let cartData: CartData = (await userData.cartData) || {};
    if (quatity === 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quatity;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData });
    if (!updatedUser) {
      res.status(500).json({
        success: false,
        message: "Failed to Update Cart",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      cartData: cartData[itemId],
    });
  } catch (error) {
    console.error("Update Cart's Function Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to Update Cart",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// Get User Cart Data
const getUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const cartData: CartData = (await userData.cartData) || {};
    res.status(200).json({
      success: true,
      cartData,
      itemCount: Object.keys(cartData).length,
    });
  } catch (error) {
    console.error("Get User Cart's Function Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to Get Cart Data",
      error: error instanceof Error ? error.message : "Unknow Error Occurred",
    });
  }
};

export { addToCart, updateCart, getUserCart };
