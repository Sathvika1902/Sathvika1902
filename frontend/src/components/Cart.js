// import '../styles/Cart.css';

// function Cart({ cartItems, setCartItems }) {
//   // Calculate total price
//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   // Update item quantity in cart
//   const updateQuantity = (id, quantity) => {
//     setCartItems((prevCartItems) =>
//       prevCartItems.map((item) => (item.id === id ? { ...item, quantity: quantity } : item))
//     );
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul className="list-group">
//           {cartItems.map((item) => (
//             <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
//               <div>
//                 <h5>{item.name}</h5>
//                 <p>${item.price} each</p>
//                 <div className="d-flex align-items-center">
//                   <label htmlFor={`quantity-${item.id}`}>Qty:</label>
//                   <select
//                     id={`quantity-${item.id}`}
//                     value={item.quantity}
//                     onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                   >
//                     {[...Array(10).keys()].map((n) => (
//                       <option key={n + 1} value={n + 1}>
//                         {n + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <h4>Total Price: ${calculateTotalPrice()}</h4>
//     </div>
//   );
// }

// export default Cart;


import { useEffect } from 'react';
import '../styles/Cart.css';

function Cart({ cartItems, setCartItems }) {
  // Fetch the cart from the backend
  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      const data = await response.json();
      setCartItems(data.products || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Update the quantity of an item in the backend and local state
  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity }),
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId._id === id ? { ...item, quantity } : item
          )
        );
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Remove an item from the cart in the backend and local state
  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId._id !== id)
        );
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item) => (
            <li
              key={item.productId._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{item.productId.name}</h5>
                <p>${item.productId.price} each</p>
                <div className="d-flex align-items-center">
                  <label htmlFor={`quantity-${item.productId._id}`}>Qty:</label>
                  <select
                    id={`quantity-${item.productId._id}`}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId._id, parseInt(e.target.value))
                    }
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h4>Total Price: ${calculateTotalPrice()}</h4>
    </div>
  );
}

export default Cart;

