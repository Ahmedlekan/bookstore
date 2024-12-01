import express, {Request, Response}from  "express"
import {validationResult, param} from "express-validator"
import Book from "../models/books"
import { BookFilterResponse } from "../types/types"


const router =  express.Router();

//book filter
router.get("/search", async (req:Request, res:Response)=>{
    try {

        const query = constructSearchQuery(req.query)

        let sortOptions = {}

        switch(req.query.sortOption){
            case "priceAsc":
                sortOptions = {price: 1}
                break
            case "priceDesc":
                sortOptions = {price: -1}
                break
        }

        const pageSize = 6
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
        const skip = (pageNumber -1) * pageSize
        
        // list all the books from the data base
        const books = await Book.find(query).sort(sortOptions).skip(skip).limit(pageSize)
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
        console.log("error", error)
        res.status(500).json({message: "Something went wrong"})
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




const constructSearchQuery = (queryParams: any)=>{
    let constructedQuery: any = {};

    if (queryParams.category) {
        constructedQuery.category = {
            $in: Array.isArray(queryParams.category)
                ? queryParams.category
                : [queryParams.category]
        };
    }

    if(queryParams.maxPrice){
        constructedQuery.price = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        }
    }

    return constructedQuery;
}


export default router