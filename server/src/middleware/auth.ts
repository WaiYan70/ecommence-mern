import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  if (typeof token !== "string") {
    return res.json({ success: false, message: "Invalid Token Format" });
  }
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.json({ success: false, message: "JWT_Secret is not defined" });
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
    return res.json({ success: false, message: "An unknown error occured" });
  }
};

export default authUser;
