import express,{Request, Response} from  "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import {check, validationResult} from "express-validator"
import verifyToken from "../midddlewares/auth"
import bcrypt from "bcryptjs"

const router = express.Router()

router.get("/me", verifyToken, async (req:Request, res: Response)=>{

    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            res.status(400).json({message: "User not found"})
            return
        }
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({messsage: "Something went wrong"})
    }
})

// /api/users/register
router.post("/register", [
    check("name", "Username is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "password with 6 or more character required").isLength({min: 6})
], async (req: Request, res: Response) => {    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({message: errors.array()})
        return
    }

    try {
        const { email, password} = req.body
        let user = await User.findOne({email})
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            password : hashPassword
        }

        user = new User(payload);
        await user.save();

        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, 
            {expiresIn:"1d"}
        )
        
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        res.status(200).json({message: "User Registered OK"})
        return
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router
