import { useState, useEffect } from 'react';
import '../styles/ProductList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// function ProductList({ addToCart, addToWishlist }) {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/products');
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         setBooks(data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const filteredBooks = books.filter((book) =>
//     book.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (maxPrice === '' || book.price <= parseFloat(maxPrice))
//   );

//   const resetFilters = () => {
//     setSearchTerm('');
//     setMaxPrice('');
//   };

//   return (
//     <div className="container mt-5">
//       <div className="filter-container d-flex justify-content-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="form-control mx-2"
//           style={{ maxWidth: '300px' }}
//         />
//         <input
//           type="number"
//           placeholder="Max price..."
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="form-control mx-2"
//           style={{ maxWidth: '200px' }}
//         />
//         <button onClick={resetFilters} className="btn btn-secondary mx-2">
//           Reset
//         </button>
//       </div>

//       <div className="row">
//         {filteredBooks.map((book) => (
//           <div key={book._id} className="col-md-4 mb-4">
//             <div className="card h-100 shadow-sm">
//               <img
//                 src={book.image}
//                 className="card-img-top img-fluid"
//                 alt={book.name}
//                 style={{ height: '250px', objectFit: 'cover' }}
//               />
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title text-center">{book.name}</h5>
//                 <p className="card-text text-center">{book.description}</p>
//                 <p className="text-center text-muted">${book.price}</p>
//                 <div className="mt-auto">
//                   <button
//                     className="btn btn-primary w-100 mb-2"
//                     onClick={() => addToCart({ ...book, quantity: 1 })}
//                   >
//                     Add to Cart
//                   </button>
//                   <button
//                     className="btn btn-outline-secondary w-100"
//                     onClick={() => addToWishlist(book)}
//                   >
//                     Add to Wishlist
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;


function ProductList({ addToCart, addToWishlist }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = async (book) => {
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123', // Replace with actual user ID if applicable
          productId: book._id,
          quantity: 1,
        }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      console.log('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToWishlist = async (book) => {
    try {
      const response = await fetch('http://localhost:3000/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123', // Replace with actual user ID if applicable
          productId: book._id,
        }),
      });
      if (!response.ok) throw new Error('Failed to add to wishlist');
      console.log('Added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (maxPrice === '' || book.price <= parseFloat(maxPrice))
  );

  const resetFilters = () => {
    setSearchTerm('');
    setMaxPrice('');
  };

  return (
    <div className="container mt-5">
      <div className="filter-container d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mx-2"
          style={{ maxWidth: '300px' }}
        />
        <input
          type="number"
          placeholder="Max price..."
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="form-control mx-2"
          style={{ maxWidth: '200px' }}
        />
        <button onClick={resetFilters} className="btn btn-secondary mx-2">
          Reset
        </button>
      </div>

      <div className="row">
        {filteredBooks.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={book.image}
                className="card-img-top img-fluid"
                alt={book.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{book.name}</h5>
                <p className="card-text text-center">{book.description}</p>
                <p className="text-center text-muted">${book.price}</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => handleAddToWishlist(book)}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
