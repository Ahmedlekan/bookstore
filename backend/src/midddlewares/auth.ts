import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies["auth_token"];

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Ensure no further execution
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.userId = decoded.userId; // Add userId to the request object
        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyToken;