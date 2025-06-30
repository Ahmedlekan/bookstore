import express, { Request, Response } from "express";
import verifyToken from "../midddlewares/auth";
import User from "../models/user";
import { CartItemItemsProps } from "../types/types";

const stripe = require('stripe')(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
    try {
        const cartItems = req.body.cartItems;
        if (!cartItems || cartItems.length === 0) {
            res.status(400).json({ error: "Cart is empty" });
            return
        }

        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        const lineItems = cartItems.map((item: CartItemItemsProps) => {
            if (!item.newPrice || typeof item.newPrice !== "number") {
                throw new Error(`Invalid price for item: ${item.title}`);
            }

            if (!item.quantity || typeof item.quantity !== "number" || item.quantity <= 0) {
                throw new Error(`Invalid quantity for item: ${item.title}`);
            }

            const imageUrl = Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : null;
            if (!imageUrl) {
                throw new Error(`Invalid image for item: ${item.title}`);
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [imageUrl],
                    },
                    unit_amount: Math.round(item.newPrice * 100),
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            billing_address_collection: "auto",
            customer_email: user.email,
            success_url: `${process.env.FRONTEND_URL}/checkout-success`,
            cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating checkout session:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error("Unknown error:", error);
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

export default router;
