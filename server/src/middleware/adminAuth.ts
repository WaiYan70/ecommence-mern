import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    if (!token || typeof token !== "string") {
      res.json({ success: false, message: "Not Authorized!" });
      return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.json({ success: false, message: "JWT_SECRET is not defiend!" });
      return;
    }
    const decodedToken = jwt.verify(token, jwtSecret);
    if (
      typeof decodedToken === "object" &&
      decodedToken.email !== process.env.ADMIN_EMAIL
    ) {
      res.status(403).json({ success: false, message: "Not Authorized!!" });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export default adminAuth;
