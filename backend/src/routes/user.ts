import express,{Request, Response} from  "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import {check, validationResult} from "express-validator"

const router = express.Router()

// /api/users/signUp
router.post("/admin", [
    check("username", "Name is required").isString(),
    check("password", "password with 6 or more character required").isLength({min: 6})
],  async (req: Request, res: Response): Promise<void> => {

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        res.status(400).json({message: errors.array()})
        return
    }

    try {
        const {username, password} = req.body
        const admin = await User.findOne({username})

        if(!admin) {
            res.status(404).send({message: "Admin not found!"})
            return
        }
        if(admin?.password !== password) {
            res.status(401).send({message: "Invalid password!"})
            return
        }

         //JSON web token
         const token = jwt.sign(
            {id: admin?._id, username: admin?.username, role: admin?.role}, 
            process.env.JWT_SECRET_KEY as string, 
            {expiresIn:"1d"}
        )
        
        // and then set it as an HTTP-only cookie in the response
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })

        res.status(200).json({
            message: "Authentication successful",
            token,
            user: {
            username: admin.username,
            role: admin.role,
            },
        })

    } catch (error) {
       
       res.status(401).send({message: "Failed to login as admin"}) 
       return
    }
});

export default router