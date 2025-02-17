import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.headers.token;
  if (!token) {
    res.json({ success: false, message: "Not Authorized Login Again" });
    return;
  }
  if (typeof token !== "string") {
    res.json({ success: false, message: "Invalid Token Format" });
    return;
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.json({ success: false, message: "JWT_Secret is not defined" });
      return;
    }
    const decodeToken = jwt.verify(token, jwtSecret);
    if (typeof decodeToken === "object" && decodeToken !== null) {
      req.body.userId = decodeToken.id;
      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.json({ success: false, message: error.message });
    }
    console.error("An unknown error occured");
    res.json({ success: false, message: "An unknown error occured" });
    return;
  }
};

export default authUser;
