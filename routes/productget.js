const router = require("express").Router();
const Product = require("../models/product");

// Route to handle fetching products by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: 'Category parameter is missing' });
    }

    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;