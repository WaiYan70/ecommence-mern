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
  successs: boolean;
  message: string;
  cartData?: CartItem;
  itemCount?: number;
  error?: string;
}

const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id);
};

const validateCartInput = (
  userId: string,
  itemId: string,
  size?: string,
  quantity?: number,
): string | null => {
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
    const { userId, itemId, size } = req.body;
    const validationError = validateCartInput(userId, itemId, size);
    if (validationError) {
      sendResponse(res, 400, { successs: false, message: validationError });
      return;
    }

    const userData = await userModel.findById(userId).select("cartData");
    if (!userData) {
      sendResponse(res, 404, { successs: false, message: "User not found" });
      return;
    }

    let cartData: CartData = userData.cartData || {};

    // Using immutable update pattern
    const updatedCartData = {
      ...cartData,
      [itemId]: {
        ...(cartData[itemId] || {}),
        [size]: ((cartData[itemId] || {})[size] || 0) + 1,
      },
    };

    await userModel.findByIdAndUpdate(
      userId,
      { cartData: updatedCartData },
      { new: true, runValidators: true },
    );
    sendResponse(res, 200, {
      successs: true,
      message: "Add to Cart Successfully",
      cartData: updatedCartData[itemId],
    });
  } catch (error) {
    console.error("Add to Cart's Function Error: ", error);
    sendResponse(res, 500, {
      successs: false,
      message: "Failed to Add to Cart",
      error: error instanceof Error ? error.message : "Unknown Error Occurred",
    });
  }
};

// Update User Cart Data
const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const validationError = validateCartInput(userId, itemId, size, quantity);
    if (validationError) {
      sendResponse(res, 400, { successs: false, message: validationError });
      return;
    }

    const userData = await userModel.findById(userId).select("cartData");
    if (validationError) {
      sendResponse(res, 400, { successs: false, message: validationError });
      return;
    }

    let cartData: CartData = userData.cartData || {};
    let updatedCartData = { ...cartData };
    if (quantity === 0) {
      if (updatedCartData[itemId]) {
        const { [size]: removed, ...remainingSizes } = updatedCartData[itemId];
        updatedCartData[itemId];
        if (Object.keys(remainingSizes).length === 0) {
          const { [itemId]: removedItem, ...remainingItems } = updatedCartData;
          updatedCartData = remainingItems;
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
        successs: false,
        message: "Failed to Update Cart",
      });
      return;
    }
    sendResponse(res, 200, {
      successs: true,
      message: "Cart Updated Successfully",
      cartData: updatedCartData[itemId],
    });
  } catch (error) {
    console.error("Update Cart's Function Error: ", error);
    sendResponse(res, 200, {
      successs: false,
      message: "Failed to Update Cart",
      error: error instanceof Error ? error.message : "Unknown Error Occurred",
    });
  }
};

// Get User Cart Data
const getUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!isValidObjectId(userId)) {
      sendResponse(res, 400, {
        successs: false,
        message: "Invalid User ID format",
      });
      return;
    }

    const userData = await userModel.findById(userId).select("cartData");
    if (!userData) {
      sendResponse(res, 404, { successs: false, message: "User not found" });
      return;
    }

    const cartData: CartData = userData.cartData || {};
    sendResponse(res, 200, {
      successs: true,
      cartData,
      itemCount: Object.keys(cartData).length,
    });
  } catch (error) {
    console.error("Get User Cart's Function Error: ", error);
    sendResponse(res, 500, {
      successs: false,
      message: "Failed to Get Cart Data",
      error: error instanceof Error ? error.message : "Unknowm Error Occurred",
    });
  }
};

export { addToCart, updateCart, getUserCart };
