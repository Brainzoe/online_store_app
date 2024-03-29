import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Store from './Store';
import Cart from './Cart';
import Payment from './Payment';
import Receipt from './Receipt';
import './styles.css'; // Import CSS file for styling

function App() {
  const [cartItems, setCartItems] = useState([]);

  
  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
        // If the item is already in the cart, increase its quantity
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
    } else {
        // If the item is not in the cart, add it with a quantity of 1
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
};

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartItems={cartItems} />
        <Routes>
          <Route exact path="/" element={<Store addToCart={addToCart} />} />
          <Route path="/store" element={<Store addToCart={addToCart} />} />
          <Route exact path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route exact path="/payment" element={<Payment cartItems={cartItems} />} />
          <Route exact path="/receipt" element={<Receipt cartItems={cartItems} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
