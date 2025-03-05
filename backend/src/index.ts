import express, {Request, Response} from "express"
import cors from "cors"
import "dotenv/config"
import * as path from "path";
import cookierParser from "cookie-parser"
import mongoose from "mongoose"
import userRoutes  from "./routes/user"
import adminRoutes from "./routes/admin"
import generalRoutes from "./routes/general"
import authRoutes from "./routes/auth"
import googleAuthRoutes from "./routes/googleauth"
import stripeRoutes from "./routes/stripe"

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)

const app = express()
app.use(cookierParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT", "PATCH","DELETE","OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials"
    ]
}))

const pathToDist = path.join(__dirname, "../../frontend/dist");
app.use(express.static(pathToDist));

// Define a route for the root path
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the server!");
});
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/general", generalRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/google-signin", googleAuthRoutes)
app.use("/api/stripe", stripeRoutes)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(pathToDist, "index.html"));
});


app.listen(7000, ()=>{
    console.log("Server running on localhost:7000")
})


