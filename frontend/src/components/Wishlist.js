// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/Wishlist.css'; // Assuming you have a CSS file for wishlist-specific styles

// function Wishlist({ wishlistItems, setWishlistItems, addToCart }) {
//   // Remove item from wishlist
//   const removeFromWishlist = (id) => {
//     const updatedWishlistItems = wishlistItems.filter(item => item.id !== id);
//     setWishlistItems(updatedWishlistItems);
//   };

//   // Move item to cart
//   const moveToCart = (item) => {
//     addToCart(item);
//     removeFromWishlist(item.id);
//     alert(`${item.name} has been moved to cart!`);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Your Wishlist</h2>
//       {wishlistItems.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <div>
//           <ul className="list-group">
//             {wishlistItems.map(item => (
//               <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5>{item.name}</h5>
//                   <p>${item.price}</p>
//                 </div>
//                 <div>
//                   <button onClick={() => removeFromWishlist(item.id)} className="btn btn-secondary me-3">Remove</button>
//                   <button onClick={() => moveToCart(item)} className="btn btn-primary">Move to Cart</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;

import { useEffect } from 'react';
import '../styles/Wishlist.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Wishlist({ wishlistItems, setWishlistItems, addToCart }) {
  // Fetch wishlist items from the backend
  const fetchWishlist = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wishlist');
      const data = await response.json();
      setWishlistItems(data.products || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  // Remove item from wishlist (Backend + State)
  const removeFromWishlist = async (id) => {
    try {
      await fetch('http://localhost:5000/api/wishlist/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id }),
      });

      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  // Move item to cart (Backend + State)
  const moveToCart = async (item) => {
    try {
      // Add to cart backend call
      await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: item._id, quantity: 1 }),
      });

      // Remove from wishlist
      await removeFromWishlist(item._id);

      // Update cart locally
      addToCart(item);
      alert(`${item.name} has been moved to cart!`);
    } catch (error) {
      console.error('Error moving to cart:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="list-group">
          {wishlistItems.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.name}</h5>
                <p>${item.price}</p>
              </div>
              <div>
                <button onClick={() => removeFromWishlist(item._id)} className="btn btn-secondary me-3">Remove</button>
                <button onClick={() => moveToCart(item)} className="btn btn-primary">Move to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;

