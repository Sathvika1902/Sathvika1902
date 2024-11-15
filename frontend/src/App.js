import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart from localStorage if it exists
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    // Retrieve wishlist from localStorage if it exists
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Function to add items to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to add items to wishlist
  const addToWishlist = (item) => {
    setWishlistItems((prevItems) => {
      const itemExists = prevItems.find((wishlistItem) => wishlistItem.id === item.id);
      return itemExists ? prevItems : [...prevItems, item];
    });
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route 
          path="/" 
          element={<ProductList addToCart={addToCart} addToWishlist={addToWishlist} />} 
        />
        <Route 
          path="/cart" 
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
        />
        <Route 
          path="/wishlist" 
          element={<Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} addToCart={addToCart} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
