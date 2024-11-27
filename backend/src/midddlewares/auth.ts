import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction)=>{

  console.log(`${req.method} ${req.url}`);
  
  const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token){
        res.status(401).json({message: "unauthorized"})
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.user = (decoded as JwtPayload).user
        next()
    } catch (error) {
        res.status(401).json({message: "unauthorized"})
        return
    }
}

export default verifyToken
