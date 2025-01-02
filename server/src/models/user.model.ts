import { Schema, model, models } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  cartData: Record<string, any>;
}

const userSchema: Schema<UserType> = new Schema<UserType>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: { type: String, required: true },
    cartData: { type: Schema.Types.Mixed, default: {} },
  },
  { minimize: false, timestamps: true },
);

const userModel = models.user || model<UserType>("user", userSchema);

export default userModel;
