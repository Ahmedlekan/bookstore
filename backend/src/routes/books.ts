import express,{Request, Response} from  "express"
const router =  express.Router();
import verifyToken from "../midddlewares/auth";
import Book from "../models/books";
import { BookType } from "../types/types";
import multer from "multer"
import cloudinary from "cloudinary"

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
router.post("/create-book", upload.array("imageFiles", 6),
    async( req: Request, res: Response)=>{

    try {
        // Get the array of uploaded image files from the request
        const imageFiles = req.files as Express.Multer.File[]
        // Check if req.files exists and contains images
        if (!imageFiles || imageFiles.length === 0) {
            res.status(400).json({ message: "No images uploaded" });
            return
        }

        const newBook: BookType  = req.body 

        // uploading the image to cloudinary
        const imageUrls = await uploadImages(imageFiles)
        console.log('Uploaded Image URLs:', imageUrls);
        
        //if the upload was successful add the imageUrls to the newHotel
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
router.get("/", async (req: Request, res: Response) => {
    
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
        const {id} = req.params;
        const book =  await Book.findById(id);
        if(!book){
            res.status(404).send({message: "Book not Found!"})
        }
        res.status(200).send(book)
        
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"})
    }
})

// For editing a book and its images
router.put("/:id", verifyToken, upload.array("imageFiles"), async(req:Request, res:Response)=>{
    
    try {
        // Extract book ID from the URL
        const bookId = req.params.id;

        // Find the book by its ID
        const book = await Book.findById(bookId);

        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return
        }

        // Extract the updated book fields from the request body (excluding images)
        const { imageUrls, ...updatedBookData } = req.body;

        // Update the fields in the book object
        Object.assign(book, updatedBookData);

        // Handle image files if new ones are uploaded
        const files = req.files as Express.Multer.File[];
        let updatedImageUrls: string[] = [];

        if (files && files.length > 0) {
            // Upload new images and get their URLs
            updatedImageUrls = await uploadImages(files);
        }

        // Merge the new image URLs with the existing ones
        book.imageUrls = [...updatedImageUrls, ...(imageUrls || book.imageUrls)];

        await book.save()
        res.status(201).json(book)

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
        // Convert the image buffer to a base64-encoded string
        const b64 = Buffer.from(image.buffer).toString("base64")
        // Construct a data URI with the image's MIME type
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        // Upload the image to Cloudinary and await the response
        const res = await cloudinary.v2.uploader.upload(dataURI)
        // Return the URL of the uploaded image
        return res.url
    })
    // Wait for all image upload promises to resolve
    const imageUrls = await Promise.all(uploadPromises)

    return imageUrls
}

export default router


