    // Function to handle removal of items from the cart
    const handleRemoveFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    return (
        <div>
            {/* Render other components */}
            <Payment cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />

        </div>
    );


export default ParentComponent;
