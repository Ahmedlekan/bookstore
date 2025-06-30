import express,{Request, Response} from  "express"
import verifyToken from "../midddlewares/auth";
import Book from "../models/books";
import { BookType } from "../types/types";
import multer from "multer"
import cloudinary from "cloudinary"

const router =  express.Router();
// This storage engine stores the files in memory as buffers instead of writing them to disk. 
// It's suitable for handling small files or scenarios where you don't want to persist files to disk.
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024, // 5MB
    }
})

// post a book
router.post("/create-book", verifyToken, upload.array("imageFiles", 6),
    async( req: Request, res: Response)=>{
    try {
        const imageFiles = req.files as Express.Multer.File[]
        if (!imageFiles || imageFiles.length === 0) {
            res.status(400).json({ message: "No images uploaded" });
            return
        }

        const categories = JSON.parse(req.body.categories || '[]');
        const newBook: BookType  = {
            ...req.body,
            categories
        }
        // uploading the image to cloudinary
        const imageUrls = await uploadImages(imageFiles)

        newBook.imageUrls = imageUrls
        const book  = new Book(newBook)
        await book.save();
        res.status(200).send({message: "Book posted successfully", book: newBook})
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create book"})
    }
})

// get all books
router.get("/", verifyToken, async (req: Request, res: Response) => {    
    try {
        const books = await Book.find().sort({ createdAt: -1});
        res.status(200).send(books)
        
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({message: "Failed to fetch books"})
    }
} )  

// For fetching a book and its details
router.get("/:id", async(req: Request, res: Response)=>{
    try {        
        const id = req.params.id.toString()
        const book =  await Book.findOne({id});
        if(!book){
            res.status(404).send({message: "Book not Found!"})
        }
        res.json(book)
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"})
    }
})

// For editing a book and its images
router.put("/:id", verifyToken, upload.array("imageFiles"), async(req:Request, res:Response)=>{    
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return
        }
        // Extract the imageUrls, categories and other book details from the body
        const { imageUrls, categories, ...updatedBookData } = req.body;

        if (categories && typeof categories === "string") {
            updatedBookData.categories = JSON.parse(categories);
        }
        // Update the fields in the book object
        Object.assign(book, updatedBookData);
        // Handle image files if new ones are uploaded
        const files = req.files as Express.Multer.File[];
        let updatedImageUrls: string[] = [];

        if (files && files.length > 0) {
            updatedImageUrls = await uploadImages(files);
        }
        // Merge the new image URLs with the existing ones
        book.imageUrls = [...updatedImageUrls, ...(imageUrls || book.imageUrls)];
        await book.save()
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
})

// For deleting a book 
router.delete("/:id", verifyToken, async(req: Request, res:Response)=>{    
    try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({message: "Failed to delete a book"})
    }
})

const  uploadImages = async (imageFiles: Express.Multer.File[])=>{
    // Upload the images to Cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64")
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI)
        return res.url
    })
    const imageUrls = await Promise.all(uploadPromises)
    return imageUrls
}

export default router


