import { ReactNode, useEffect, useState } from "react";
import { ShopContext, ShopContextType } from "./ShopContext";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define CartItems structure
interface CartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const navigate = useNavigate();

  const addToCart = (itemId: string, size: string): void => {
    if (!size) {
      toast.error("Please select the size before adding into the cart");
      return;
    }
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };

      if (!updatedCartItems[itemId]) {
        updatedCartItems[itemId] = {};
      }

      if (updatedCartItems[itemId][size]) {
        updatedCartItems[itemId][size] += 1;
      } else {
        updatedCartItems[itemId][size] = 1;
      }

      return updatedCartItems;
    });
  };

  const getCartCount = (): number => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemId] && updatedCartItems[itemId][size]) {
        updatedCartItems[itemId][size] = quantity;
      }
      return updatedCartItems;
    });
  };

  const getCartAmount = (): number => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) {
        console.warn(`Product with ${itemId} is not found`);
        continue;
      }
      for (const size in cartItems[itemId]) {
        totalAmount += itemInfo.originalPrice * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  // Define the contextValue object
  const contextValue: ShopContextType = {
    products,
    currency: "฿",
    delivery_fee: 10,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
