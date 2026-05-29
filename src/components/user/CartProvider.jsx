import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:9999/carts")
      .then((response) => {
        const totalItems = response.data.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );

        setCartCount(totalItems);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
