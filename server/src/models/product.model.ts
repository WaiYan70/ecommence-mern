import { Schema, model, models } from "mongoose";

interface ProductType extends Document {
  image: string[];
  name: string;
  category: string;
  subCategory: string;
  description: string;
  originalPrice: number;
  size: string[];
  date: Date;
}

const productSchema: Schema<ProductType> = new Schema<ProductType>({
  image: { type: [String], required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  size: { type: [String], required: true },
  date: { type: Date, default: Date.now, required: true },
});

const productModel =
  models.product || model<ProductType>("product", productSchema);

export default productModel;
