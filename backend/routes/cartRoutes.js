// const express = require('express');
// const Cart = require('../models/Cart');
// const Product = require('../models/Product'); // Ensure you can validate the product
// const router = express.Router();

// // POST: Add item to the cart
// router.post('/', async (req, res) => {
//   const { productId, quantity } = req.body;

//   try {
//     // Validate product existence
//     const productExists = await Product.findById(productId);
//     if (!productExists) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Find or create the user's cart (assumes one cart for all users, modify for user-specific carts)
//     let cart = await Cart.findOne();
//     if (!cart) {
//       cart = new Cart({ products: [] });
//     }

//     // Check if the product is already in the cart
//     const productIndex = cart.products.findIndex(
//       (p) => p.productId.toString() === productId
//     );

//     if (productIndex >= 0) {
//       // Update quantity if product exists
//       cart.products[productIndex].quantity += quantity;
//     } else {
//       // Add new product to cart
//       cart.products.push({ productId, quantity });
//     }

//     // Save the updated cart
//     const savedCart = await cart.save();
//     res.status(201).json(savedCart);
//   } catch (error) {
//     console.error('Error updating cart:', error);
//     res.status(500).json({ message: 'Error updating cart', error: error.message });
//   }
// });

// // GET: Retrieve the cart
// router.get('/', async (req, res) => {
//   try {
//     const cart = await Cart.findOne().populate('products.productId'); // Populate product details
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart is empty' });
//     }
//     res.json(cart);
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     res.status(500).json({ message: 'Error fetching cart', error: error.message });
//   }
// });

// // DELETE: Remove an item from the cart
// router.delete('/:productId', async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const cart = await Cart.findOne();
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     cart.products = cart.products.filter(
//       (p) => p.productId.toString() !== productId
//     );

//     const savedCart = await cart.save();
//     res.json(savedCart);
//   } catch (error) {
//     console.error('Error removing item from cart:', error);
//     res.status(500).json({ message: 'Error removing item from cart', error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Ensure Product model is available for validation
const router = express.Router();

// POST: Add item to the cart
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Validate if the product exists in the database
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create a cart (user-specific cart logic can be implemented here)
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ products: [] });
    }

    // Check if the product is already in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex >= 0) {
      // Update quantity if product already exists in the cart
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add the product to the cart
      cart.products.push({ productId, quantity });
    }

    // Save the updated cart
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
});

// GET: Retrieve the cart
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('products.productId'); // Populate product details
    res.json(cart || { message: 'Cart is empty' });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// DELETE: Remove an item from the cart
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product from the cart
    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

// PATCH: Update quantity of an item in the cart
router.patch('/', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;
      const savedCart = await cart.save();
      return res.json(savedCart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Error updating quantity', error: error.message });
  }
});

module.exports = router;

