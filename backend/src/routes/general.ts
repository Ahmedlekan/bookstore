import express, {Request, Response}from  "express"
import {validationResult, param} from "express-validator"
import Book from "../models/books"
import Cart from "../models/cart"
import { BookFilterResponse } from "../types/types"
import mongoose from "mongoose"

const router =  express.Router();

//book filter
router.get("/search", async (req:Request, res:Response)=>{
    try {

        const query = constructSearchQuery(req.query)

        let sortOptions = {}

        switch(req.query.sortOption){
            case "priceAsc":
                sortOptions = {newPrice: 1}
                break
            case "priceDesc":
                sortOptions = {newPrice: -1}
                break
            default:
                sortOptions = {};
                break;
        }

        const pageSize = 6
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
        const skip = (pageNumber -1) * pageSize
        
        // list all the books from the data base
        const books = await Book.find(query).sort(sortOptions).skip(skip).limit(pageSize)
        console.log("Books Retrieved:", books);
        const total = await Book.countDocuments(query)
        // return the resposnse to the front end with its pagination
        const response: BookFilterResponse = {
            data: books,
            pagination:{
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        }

        res.json(response)

    } catch (error) {
        console.error("Error in search API:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

// fetch all books
router.get("/general-books",  async (req : Request, res: Response)=>{

    try {
        const allBooks = await Book.find().sort({createdAt : -1})
        res.json(allBooks)
        
    } catch (error) {
        res.status(500).json({message: "Error fetching Books"})   
    }
})

// add to art
router.post("/add-to-cart", async (req:Request, res:Response) => {

    try {

        const userId = req.userId || "guest"; // Extracted from the decoded JWT token
        const { bookId, quantity } = req.body;    
        
        // Fetch the full book details from the database
        const book = await Book.findById(bookId);

        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
            return
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                // Add a new book with all required fields
                cart.items.push({
                    bookId, quantity
                });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});

// fetch all cart items
router.get("/fetch-cart-items", async (req: Request, res:Response) => {
    const userId = req.userId || "guest";

    try {
        const cart = await Cart.findOne({ userId }).populate('items.bookId');

        if (!cart) {
            res.status(404).json({ success: false, message: "Cart not found" });
            return
        }

        const itemsWithDetails = cart.items.map((item) => ({
            bookId: item.bookId._id,
            title: item.bookId.title,
            image: item?.bookId.imageUrls ?? [], // Assuming it's the first image
            newPrice: item.bookId.newPrice,
            oldPrice: item.bookId.oldPrice,

            quantity: 1
        }));

        res.status(200).json({ success: true, items: itemsWithDetails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});;

// fetch Each book and its details
router.get("/:id", async (req: Request, res: Response)=>{

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    const id = req.params.id.toString()

    try {
        const book = await Book.findById(id);
    
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return
        }
    
        res.json(book);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error Fetching Book" });
      }
})

// Update cart item quantity
router.patch("/update-cart-quantity", async (req:Request, res:Response) => {
    
    const userId = req.userId || "guest";
    const { bookId, quantity } = req.body;

    console.log("The", bookId, quantity)

    // Ensure quantity is valid
    if (!quantity || quantity <= 0) {
        res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
        return;
    }

    // Validate bookId
    if (!bookId || !mongoose.isValidObjectId(bookId)) {
        res.status(400).json({ success: false, message: "Invalid Book ID" });
        return
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            res.status(404).json({ success: false, message: "Cart not found" });
            return
        }

        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
        
        if (itemIndex === -1) {
            res.status(404).json({ success: false, message: "Book not found in cart" });
            return
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});

// Delete a product from the cart
router.delete("/delete-cart-item", async (req:Request, res:Response) => {

    const userId = req.userId || "guest";
    const { bookId } = req.body;

    // Validate bookId
    if (!bookId || !mongoose.isValidObjectId(bookId)) {
        res.status(400).json({ success: false, message: "Invalid Book ID" });
        return
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(404).json({ success: false, message: "Cart not found" });
            return
        }

        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
        if (itemIndex === -1) {
            res.status(404).json({ success: false, message: "Book not found in cart" });
            return
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.status(200).json({ success: true, message: "Book removed from cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});


// Query construction helper function

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    // Filter by categories only if categories are provided
    if (queryParams.categories && queryParams.categories.length > 0) {
        constructedQuery.categories = {
            $in: Array.isArray(queryParams.categories)
                ? queryParams.categories
                : [queryParams.categories], // Ensure it's an array
        };
    }

    // Filter by max price
    if (queryParams.maxPrice) {
        constructedQuery.newPrice = {
            $lte: parseFloat(queryParams.maxPrice), // Parse the price to a number
        };
    }

    console.log("Constructed Query:", constructedQuery); // Debugging
    return constructedQuery;
};

export default router