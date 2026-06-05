import { getCarts } from "../config/api";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  async function loadCartCount() {
    try {
      const response = await getCarts();

      const totalItems = response.data.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      setCartCount(totalItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        loadCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
