import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

function Cart({ cartItems, removeFromCart }) {
    // Function to calculate total price
    const calculateTotal = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * (item.quantity || 1); // Use item.quantity or default to 1 if undefined
        });
        return totalPrice.toFixed(2);
    };

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {/* Display cart items */}
                    {cartItems.map((item, index) => (
                        <div key={index}>
                            <h3>{item.title}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <button onClick={() => removeFromCart(index)}>Remove from Cart</button>
                        </div>
                    ))}
                    {/* Calculate total price */}
                    <p>Total: ${calculateTotal()}</p>
                    {/* Payment button */}
                    <Link to="/payment">
                        <button>Proceed to Payment</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Cart;
