const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Replace with actual user ID if applicable
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
