const router = require("express").Router();
const multer = require('multer');
const Product = require("../models/product");
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category || !req.file) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

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

        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
        
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
