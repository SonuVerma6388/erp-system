import { useState } from "react";

const usePOS = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(id);
    }

    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.selling_price) * item.quantity,
    0,
  );

  const clearCart = () => {
    setCart([]);
  };
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  };
};

export default usePOS;
