import express,{Request, Response} from  "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {check, validationResult} from "express-validator"
import verifyToken from "../midddlewares/auth"

const router = express.Router()

router.post(
    "/login",
    [
        check("email", "A valid email is required").isEmail(),
        check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        // Handle validation errors
        if (!errors.isEmpty()) {
            res.status(400).json({ 
                message: "Validation errors", 
                errors: errors.array() 
            });
            return
        }

        try {
            const { email, password } = req.body;
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ message: "Invalid Credentials" });
                return
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                res.status(400).json({ message: "Invalid Credentials" });
                return
            }

            // Create JWT
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "1d" }
            );

            // Set token as HTTP-only cookie
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000, // 1 day
            });

            // Return user ID
            res.status(200).json({ userId: user._id });
            return

        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ message: "Something went wrong" });
            return
        }
    }
);

// to know if our cookies is validated or not
router.get("/validate-token", verifyToken, (req: Request, res: Response)=>{
    res.status(200).send({userId: req.userId})
})

router.post("/logout", (req: Request, res: Response)=>{
    res.cookie("auth_token", "", {
        expires: new Date(0)
    })
    res.send()
})

export default router