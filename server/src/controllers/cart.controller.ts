import { Request, Response } from "express";
import userModel from "../models/user.model";
import { Types } from "mongoose";

interface CartItem {
  [size: string]: number;
}

interface CartData {
  [itemId: string]: CartItem;
}

interface CartOperationResult {
  success: boolean;
  message: string;
  cartData?: CartData | CartItem;
  itemCount?: number;
  error?: string;
}

// Utility Function to Validate MongoDB ObjectId format
const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id);
};

// Utility Function to Validate Cart Operation Inputs
const validateCartInput = (
  userId: string,
  itemId: string,
  size?: string,
  quantity?: number,
): string | null => {
  if (!userId || !itemId) return "User ID and Item ID are required";
  if (!isValidObjectId(userId)) return "Invalid user ID format";
  if (!isValidObjectId(itemId)) return "Invalid item ID format";
  if (size && typeof size !== "string") return "Invalid size format";
  if (quantity !== undefined && (typeof quantity !== "number" || quantity < 0))
    return "Invalid Quantity";
  return null;
};

// Helper Function to Handle Response
const sendResponse = (
  res: Response,
  statusCode: number,
  result: CartOperationResult,
): void => {
  res.status(statusCode).json(result);
};

// Add product to User Cart
const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { itemId, size } = req.body;
    const userId = req.body.userId;

    if (!userId) {
      sendResponse(res, 401, {
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    // Check the size when User adds a product to cart
    if (!size) {
      sendResponse(res, 400, { success: false, message: "Size is required" });
      return;
    }

    const validationError = validateCartInput(userId, itemId, size);
    if (validationError) {
      sendResponse(res, 400, { success: false, message: validationError });
      return;
    }

    const userData = await userModel.findById(userId).select("cartData");
    if (!userData) {
      sendResponse(res, 404, { success: false, message: "User not found" });
      return;
    }

    // Using immutable update pattern
    let cartData: CartData = userData.cartData || {};
    const currentQuantity = (cartData[itemId] || {})[size] || 0;
    const updatedCartData = {
      ...cartData,
      [itemId]: {
        ...(cartData[itemId] || {}),
        [size]: currentQuantity + 1,
      },
    };

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData: updatedCartData },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      sendResponse(res, 500, {
        success: false,
        message: "Failed to update cart",
      });
      return;
    }
    sendResponse(res, 200, {
      success: true,
      message: "Add to Cart Successfully",
      cartData: updatedCartData,
    });
  } catch (error) {
    console.error("Add to Cart's Function Error: ", error);
    sendResponse(res, 500, {
      success: false,
      message: "Failed to Add to Cart",
      error: error instanceof Error ? error.message : "Unknown Error Occurred",
    });
  }
};

// Update User Cart Data
const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Check the product's quantity before updating to Cart
    if (quantity === undefined) {
      sendResponse(res, 400, {
        success: false,
        message: "Quantity is required",
      });
      return;
    }

    const validationError = validateCartInput(userId, itemId, size, quantity);
    if (validationError) {
      sendResponse(res, 400, { success: false, message: validationError });
      return;
    }

    const userData = await userModel.findById(userId).select("cartData");
    if (!userData) {
      sendResponse(res, 400, { success: false, message: "User not found" });
      return;
    }

    let cartData: CartData = userData.cartData || {};
    let updatedCartData = { ...cartData };
    if (quantity === 0) {
      if (updatedCartData[itemId]) {
        const { [size]: removed, ...remainingSizes } = updatedCartData[itemId];
        if (Object.keys(remainingSizes).length === 0) {
          delete updatedCartData[itemId];
        } else {
          updatedCartData[itemId] = remainingSizes;
        }
      }
    } else {
      updatedCartData = {
        ...updatedCartData,
        [itemId]: {
          ...(updatedCartData[itemId] || {}),
          [size]: quantity,
        },
      };
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData: updatedCartData },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      sendResponse(res, 500, {
        success: false,
        message: "Failed to Update Cart",
      });
      return;
    }
    sendResponse(res, 200, {
      success: true,
      message: "Cart Updated Successfully",
      cartData: updatedCartData[itemId],
    });
  } catch (error) {
    console.error("Update Cart's Function Error: ", error);
    sendResponse(res, 500, {
      success: false,
      message: "Failed to Update Cart",
      error: error instanceof Error ? error.message : "Unknown Error Occurred",
    });
  }
};

// Get User Cart Data
const getUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId;
    if (!isValidObjectId(userId)) {
      sendResponse(res, 400, {
        success: false,
        message: "Invalid User ID format",
      });
      return;
    }

    const userData = await userModel.findById(userId).select("cartData");
    if (!userData) {
      sendResponse(res, 404, { success: false, message: "User not found" });
      return;
    }

    const cartData: CartData = userData.cartData || {};
    sendResponse(res, 200, {
      success: true,
      message: "Get User Cart Data Successfully",
      cartData: userData.cartData || {},
      itemCount: Object.keys(userData.cartData || {}).length,
    });
  } catch (error) {
    console.error("Get User Cart's Function Error: ", error);
    sendResponse(res, 500, {
      success: false,
      message: "Failed to Get Cart Data",
      error: error instanceof Error ? error.message : "Unknown Error Occurred",
    });
  }
};

export { addToCart, updateCart, getUserCart };
