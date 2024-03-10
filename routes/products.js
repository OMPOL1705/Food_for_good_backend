const router = require("express").Router();
const multer = require('multer');
const Product = require("../models/product");
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Rename the file to avoid duplicates
    }
});

// Set up multer instance
const upload = multer({ storage: storage });
// Route to handle product creation along with image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Log the request body to inspect what data is being received
        // console.log('Request body:', req.body);

        // Log the uploaded file information
        // console.log('Uploaded file:', req.file);

        // Extract product data from request body
        const { name, description, price, category } = req.body;

        // Ensure all required fields are present
        if (!name || !description || !price || !category || !req.file) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new product object with image URL
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl: {
                data: fs.readFileSync('uploads/' + req.file.filename),
                contentType: 'image/png'
            }
        });

        // Save the new product to the database
        await newProduct.save();

        // Send a success response
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
        
    } catch (error) {
        // Handle errors
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
