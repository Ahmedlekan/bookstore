import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sign-In Route
router.post('/google-signin', async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            res.status(400).json({ message: "Invalid Google token" });
            return
        }

        const { email, name, sub: googleId } = payload;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if not exists
            user = new User({
                email,
                name,
                googleId,
                password: null, // No password for Google users
            });
            await user.save();
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d' }
        );

        // Set token as HTTP-only cookie
        res.cookie('auth_token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000, // 1 day
        });

        res.status(200).json({ userId: user._id, message: "Login successful" });
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router