import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './store.css'; // Import CSS file for styling

function Store({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        console.log('API response:', response.data); // Log API response for debugging
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('API response does not contain an array of products:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartCount(cartCount + 1); // Increment cart count when a product is added
  };

  return (
    <div className="store-container">
      <h2>Store</h2>
      {products.map((product) => (
        <div key={product.id} className="store-item"> {/* Apply CSS class for each product item */}
          <h3>{product.title}</h3> {/* Use title instead of name */}
          <img src={product.thumbnail} alt={product.title} /> {/* Display product thumbnail */}
          <p>${product.price}</p>
          <div className="description">
            <p>{product.description}</p> {/* Display product description inside a frame */}
          </div>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      <p>Products in Cart: {cartCount}</p> {/* Display total products in cart */}
    </div>
  );
}

export default Store;
