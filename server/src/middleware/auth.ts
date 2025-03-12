import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denined. No token" });
  }

  if (!SECRET_KEY) {
    return res
      .status(500)
      .json({ message: "Server error: Missing JWT secret" });
  }

  try {
    const decode = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as any).user = decode;
    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
