import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

interface UserInput {
  name: string;
  email: string;
  password: string;
}

const createToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, jwtSecret, { expiresIn: "1d" });
};

const validateUserInput = (email: string, password: string): string | null => {
  if (!validator.isEmail(email)) {
    return "Please Enter a Valid Email.";
  }
  if (password.length < 8) {
    return "Please enter a strong password with at least 8 characters.";
  }
  return null;
};

const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
  console.error("An unknow error occurred");
  return res.json({ success: false, message: "An unknown error occurred" });
};

const userRegister = async (
  req: Request<{}, {}, UserInput>,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password }: UserInput = req.body;
    if (!name || !email || !password) {
      res.json({ success: false, message: "All fields are required" });
      return;
    }
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.json({ success: false, message: "User Already Exists" });
      return;
    }
    const error = validateUserInput(email, password);
    if (error) {
      res.json({ success: false, message: error });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    handleError(res, error);
  }
};

const userLogin = async (
  req: Request<{}, {}, UserInput>,
  res: Response,
): Promise<void> => {
  try {
    const { email, password }: UserInput = req.body;
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      res.json({ success: false, message: "User doesn't exists" });
      return;
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (isMatch) {
      const token = createToken(userExists._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.json({ success: false, message: "JWT_SECRET is not defiend!" });
      return;
    }
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1d" });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export { userLogin, userRegister, adminLogin };
