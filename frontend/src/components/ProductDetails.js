import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Books from '../Utils/utils';
import '../styles/ProductDetails.css';

function ProductDetails({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const foundBook = Books.find(book => book.id === parseInt(id));
    setBook(foundBook);
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...book, quantity: parseInt(quantity) });
    alert(`${book.name} (x${quantity}) has been added to the cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(book);
    alert(`${book.name} has been added to the wishlist!`);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details-container">
      <div className="book-details">
        <img src={book.image} alt={book.name} className="book-details-image" />
        <div className="book-details-info">
          <h1>{book.name}</h1>
          <h4>by {book.author}</h4>
          <p>{book.description}</p>
          <p>${book.price}</p>
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <select id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              {[...Array(10).keys()].map(n => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
          <button onClick={handleAddToWishlist} className="btn btn-secondary">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
