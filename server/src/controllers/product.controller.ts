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
      sizes: string[];
    } = req.body;
    const files = req.files as UploadedFiles;

    const image1 = files?.image1?.[0] || null;
    const image2 = files?.image2?.[0] || null;
    const image3 = files?.image3?.[0] || null;
    const image4 = files?.image4?.[0] || null;
    if (!image1 && !image2 && !image3 && !image4) {
      res.json({
        success: false,
        message: "At least one image is required",
      });
      return;
    }

    const images = [image1, image2, image3, image4].filter(
      (item): item is Express.Multer.File => item !== null,
    );
    const imageURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );
    console.log("Filtered Images: ", images);
    console.log("ImagesURL: ", imageURL);
    console.log("Check-List Images: ", { image1, image2, image3, image4 });

    if (
      !title ||
      !description ||
      !originalPrice ||
      !category ||
      !subCategory ||
      !sizes
    ) {
      res.json({ success: false, message: "All fields are required" });
      return;
    }
    console.log("Added Product Details: ", {
      title,
      description,
      originalPrice,
      category,
      subCategory,
      sizes,
    });

    const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
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
    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      data: { title, description, originalPrice, category, subCategory, sizes },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res.json({ success: false, message: "Product ID is required!" });
      return;
    }
    const deletdProduct = await productModel.findByIdAndDelete(productId);
    if (!deletdProduct) {
      res.json({ success: false, message: "Product is not found" });
      return;
    }
    res.json({ success: true, message: "Product Removed Successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to Remove Product" });
  }
};

const singleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res.json({ success: false, message: "Product ID is required" });
      return;
    }
    const findSingleProduct = await productModel.findById(productId);
    if (!findSingleProduct) {
      res.json({ success: false, message: "Product is not found" });
      return;
    }
    res.json({ success: true, data: findSingleProduct });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Fail to Fetch Specific One Product" });
  }
};

const listProducts = async (req: Request, res: Response) => {
  try {
    const listOfProducts = await productModel.find({});
    res.json({ success: true, listOfProducts });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Fail to Fetch Products List" });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
