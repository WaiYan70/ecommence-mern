import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model";

interface UploadedFiles {
  image1?: Express.Multer.File[];
  image2?: Express.Multer.File[];
  image3?: Express.Multer.File[];
  image4?: Express.Multer.File[];
}

const addProduct = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    console.log("Request Headers:", req.headers);

    // Destructuring fields from the request body
    const {
      title,
      description,
      originalPrice,
      category,
      subCategory,
      sizes,
    }: {
      title: string;
      description: string;
      originalPrice: number;
      category: string;
      subCategory: string;
      sizes: string | string[];
    } = req.body;

    const parsedOriginalPrice = Number(originalPrice);

    // Validate the parsed value to ensure it's a number
    if (isNaN(parsedOriginalPrice)) {
      res.status(400).json({
        success: false,
        message: "'originalPrice' must be a valid number",
      });
      return;
    }

    // Check for missing fields
    if (
      !title ||
      !description ||
      !originalPrice ||
      !category ||
      !subCategory ||
      !sizes
    ) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    // Parse 'sizes' field if it's a string
    let parsedSizes: string[];
    if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes); // If it's a stringified array, parse it
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Invalid 'sizes' format" });
        return;
      }
    } else {
      parsedSizes = sizes; // If already an array, use it as-is
    }
    console.log("Parsed Sizes:", parsedSizes);

    // Handling uploaded files
    const files = req.files as UploadedFiles;

    // Extracting the images
    const image1 = files?.image1?.[0] || null;
    const image2 = files?.image2?.[0] || null;
    const image3 = files?.image3?.[0] || null;
    const image4 = files?.image4?.[0] || null;

    if (!image1 && !image2 && !image3 && !image4) {
      res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
      return;
    }

    // Filtering and uploading images to Cloudinary
    const images = [image1, image2, image3, image4].filter(
      (item): item is Express.Multer.File => item !== null,
    );
    console.log("Filtered Images: ", images);

    const imageURL = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (err) {
          console.error("Cloudinary Upload Error:", err);
          throw new Error("Failed to upload image to Cloudinary");
        }
      }),
    );
    console.log("Uploaded Image URLs:", imageURL);

    // Preparing the final product data object
    const productData = {
      title,
      description,
      originalPrice: Number(originalPrice),
      category,
      subCategory,
      sizes: parsedSizes,
      image: imageURL,
      date: Date.now(),
    };
    console.log("Final Product Data:", productData);

    // Saving the product data to the database
    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: productData,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res
        .status(400)
        .json({ success: false, message: "Product ID is required!" });
      return;
    }
    const deletdProduct = await productModel.findByIdAndDelete(productId);
    if (!deletdProduct) {
      res.status(404).json({ success: false, message: "Product is not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Product Removed Successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to Remove Product" });
  }
};

const singleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
      return;
    }
    const findSingleProduct = await productModel.findById(productId);
    if (!findSingleProduct) {
      res.status(404).json({ success: false, message: "Product is not found" });
      return;
    }
    res.status(200).json({ success: true, data: findSingleProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Fail to Fetch Specific One Product" });
  }
};

const listProducts = async (req: Request, res: Response) => {
  try {
    const listOfProducts = await productModel.find({});
    res.status(200).json({ success: true, listOfProducts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Fail to Fetch Products List" });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
