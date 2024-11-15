// // const express = require('express');
// const Wishlist = require('../models/Wishlist');
// const Product = require('../models/Product');
// const router = express.Router();

// // GET: Retrieve the wishlist
// router.get('/', async (req, res) => {
//   try {
//     const wishlist = await Wishlist.findOne().populate('products'); // Populate product details
//     res.json(wishlist || { message: 'Wishlist is empty' });
//   } catch (error) {
//     console.error('Error fetching wishlist:', error);
//     res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
//   }
// });

// // POST: Add an item to the wishlist
// router.post('/add', async (req, res) => {
//   const { productId } = req.body;

//   try {
//     // Validate if the product exists
//     const productExists = await Product.findById(productId);
//     if (!productExists) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     let wishlist = await Wishlist.findOne();
//     if (!wishlist) {
//       wishlist = new Wishlist({ products: [] });
//     }

//     // Add product if it's not already in the wishlist
//     if (!wishlist.products.includes(productId)) {
//       wishlist.products.push(productId);
//       const savedWishlist = await wishlist.save();
//       return res.status(201).json(savedWishlist);
//     } else {
//       return res.status(400).json({ message: 'Product already in wishlist' });
//     }
//   } catch (error) {
//     console.error('Error adding item to wishlist:', error);
//     res.status(500).json({ message: 'Error adding item to wishlist', error: error.message });
//   }
// });

// // POST: Remove an item from the wishlist
// router.post('/remove', async (req, res) => {
//   const { productId } = req.body;

//   try {
//     let wishlist = await Wishlist.findOne();
//     if (!wishlist) {
//       return res.status(404).json({ message: 'Wishlist not found' });
//     }

//     // Filter out the product from the wishlist
//     wishlist.products = wishlist.products.filter(
//       (p) => p.toString() !== productId
//     );

//     const savedWishlist = await wishlist.save();
//     res.json(savedWishlist);
//   } catch (error) {
//     console.error('Error removing item from wishlist:', error);
//     res.status(500).json({ message: 'Error removing item from wishlist', error: error.message });
//   }
// });

// module.exports = router;

const express = require('express'); // Add this line to import express
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const router = express.Router();

// GET: Retrieve the wishlist
router.get('/', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne().populate('products');
    res.json(wishlist || { message: 'Wishlist is empty' });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
});

// POST: Add an item to the wishlist
router.post('/add', async (req, res) => {
  const { productId } = req.body;

  try {
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne();
    if (!wishlist) {
      wishlist = new Wishlist({ products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      const savedWishlist = await wishlist.save();
      return res.status(201).json(savedWishlist);
    } else {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    res.status(500).json({ message: 'Error adding item to wishlist', error: error.message });
  }
});

// POST: Remove an item from the wishlist
router.post('/remove', async (req, res) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne();
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);

    const savedWishlist = await wishlist.save();
    res.json(savedWishlist);
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    res.status(500).json({ message: 'Error removing item from wishlist', error: error.message });
  }
});

module.exports = router;

