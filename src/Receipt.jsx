import React, { useState, useEffect } from 'react';

function Receipt() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [transactionDate, setTransactionDate] = useState('');

  useEffect(() => {
    // Retrieve purchased items and transaction date from local storage
    const storedData = localStorage.getItem('purchasedItems');
    if (storedData) {
      try {
        const { items, date } = JSON.parse(storedData);
        if (Array.isArray(items)) {
          setCartItems(items);

          // Calculate total price
          let total = 0;
          items.forEach(item => {
            total += item.price * item.quantity;
          });
          setTotalPrice(total);

          // Set transaction date
          setTransactionDate(date);
        } else {
          console.error('Stored items are not in the expected format.');
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, []);

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h2>Receipt</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.title} - Quantity: {item.quantity} - Total Price: ${item.price * item.quantity}</li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice}</p>
      <p>Transaction Date: {transactionDate}</p>
      <button onClick={handlePrint}>Print Receipt</button>
    </div>
  );
}

export default Receipt;
