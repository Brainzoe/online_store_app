import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment({ cartItems }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const navigate = useNavigate(); // Using useNavigate inside the component

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate card details
      validateCardDetails(cardDetails);

      // Simulate payment process
      await simulatePayment();

      // Save purchased items and transaction date to local storage
      const purchasedItems = { items: cartItems, date: new Date().toLocaleString() };
      localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));

      // Payment successful, navigate to receipt page
      navigate('/receipt');
      // Clear the cart after successful payment
      localStorage.removeItem('cartItems');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const simulatePayment = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        resolve();
      }, 2000); // Simulate payment process taking 2 seconds
    });
  };

  // Validation function for card details
  const validateCardDetails = (details) => {
    // Check if any required field is empty
    if (!details.cardNumber || !details.expiryDate || !details.cvv) {
      throw new Error('Please fill in all fields');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  return (
    <div>
      <h2>Payment</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.title} - Quantity: {item.quantity} - ${item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      <p>Total Price: ${calculateTotalPrice()}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={handleInputChange} />
        <input type="text" name="expiryDate" placeholder="Expiry Date" value={cardDetails.expiryDate} onChange={handleInputChange} />
        <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleInputChange} />
        <button type="submit" disabled={loading}>Proceed with Payment</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Payment;
