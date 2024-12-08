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

        //user without password
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

// /api/users/signUp
router.post("/register", [
    check("username", "Username is required").isString(),
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
        // Finding a user in the database by their email address
        let user = await User.findOne({email}) // Accessing the email from the request body;
        
        // Checking if a user with the provided email already exists
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
            role : "GENERAL",
            password : hashPassword
        }

        // Creating a new User instance & save to the database
        user = new User(payload);
        await user.save();

        //JSON web token
        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, 
            {expiresIn:"1d"}
        )
        
        // and then set it as an HTTP-only cookie in the response
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

// // get all users
// router.get("/all-user", verifyToken, async (req:Request, res:Response)=>{
    
//     try {
//         const allUsers = await User.find()
//         if (allUsers){
//             return res.status(200).json(allUsers)
//         }
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({messsage: "Something went wrong"})
//     }
// })

// router.post("/user-role", verifyToken, async (req: Request, res: Response)=>{

//     try {

//         const sessionUser = req.userId

//         const { userId , email, name, role} = req.body

//         const payload = {
//             ...( email && { email : email}),
//             ...( name && { name : name}),
//             ...( role && { role : role}),
//         }

//         const user = await User.findById(sessionUser)
//         if (!user){
//             return res.status(400).json({ message: "UserId not found" });
//         }
//         const updateUser = await User.findByIdAndUpdate(userId, payload)
//         if(updateUser){
//             return res.status(400).json({ message: "User updated" });
//         }

//         return res.status(200).json({message: "User Updated"})

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({messsage: "Something went wrong"})
//     }
// })

export default router