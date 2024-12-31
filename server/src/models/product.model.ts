import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: { type: Array, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  subCategory: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  size: { type: Array, required: true },
  date: { type: Number, required: true },
});

const productModal =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModal;
