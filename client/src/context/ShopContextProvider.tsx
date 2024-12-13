// import { ReactNode } from "react";

// import { ShopContext, contextValue } from "./ShopContext";

// interface ShopContextProvideProps {
//   children: ReactNode;
// }

// const ShopContextProvider: React.FC<ShopContextProvideProps> = ({
//   children,
// }) => {
//   return (
//     <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

// import { ReactNode, useState } from "react";
// import { ShopContext } from "./ShopContext";
// import { products } from "../assets/assets";

// interface ShopContextProvideProps {
//   children: ReactNode;
// }

// const ShopContextProvider: React.FC<ShopContextProvideProps> = ({
//   children,
// }) => {
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});

//   const addToCart = async (itemId, size) => {
//     const cartData = structuredClone(cartItems);
//     if (cartData[itemId][size]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }
//     setCartItems(cartData);
//   };

//   const contextValue = {
//     products,
//     currency: "$",
//     delivery_fee: 10,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import { ReactNode, useState } from "react";
import { ShopContext, ShopContextType } from "./ShopContext";
import { products } from "../assets/assets";

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

  const addToCart = (itemId: string, size: string): void => {
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

  // Define the contextValue object
  const contextValue: ShopContextType = {
    products,
    currency: "$",
    delivery_fee: 10,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
