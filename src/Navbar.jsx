// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import cartIcon from './assets/927435-200.png';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
function Navbar({ cartItems }) {
  // Check if cartItems is undefined or not an array
  const cartItemCount = Array.isArray(cartItems) ? cartItems.length : 0;

  return (
      <nav className="navbar">
          <h1>JohnRiches Collections</h1>
          <div className="nav-links">
              <Link to="/store" className="nav-link">
                  <StoreMallDirectoryIcon style={{ fontSize: '30px', marginRight: '5px' }} />
                  <span className="store-text">Store</span>
              </Link>
              <Link to="/cart" className="nav-link">
                  <img src={cartIcon} width={'30px'} alt="Cart" />
                  <span className="cart-count">{cartItemCount}</span>
              </Link>
          </div>
      </nav>
  );
}


export default Navbar;
