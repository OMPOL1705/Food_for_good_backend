const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        data: Buffer,
        contentType: String
    }
}, { collection: 'products' }); // Set the collection name to 'products'

// Create a Product model using the schema
const Product = mongoose.model('product', productSchema); // Use singular 'Product' for model name

// Export the Product model
module.exports = Product;
