// Solution - 1
// import { createContext } from "react";
// import { Product, products } from "../assets/assets";

// interface ShopContextType {
//   products: Product[];
//   currency: string;
//   delivery_fee: number;
// }

// export const ShopContext = createContext<ShopContextType | undefined>(
//   undefined,
// );

// export const currency = "$";
// export const delivery_fee = 10;
// export const contextValue = {
//   products,
//   currency,
//   delivery_fee,
// };

// Solution - 2
// import { createContext, useState } from "react";
// import { products } from "../assets/assets";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "$";
//   const delivery_fee = 10;

//   const value = {
//     products, currency, delivery_fee,
//   }
//   return(
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   )
// }

// export default ShopContextProvider;

import { createContext } from "react";
import { Product } from "../assets/assets";

// Define CartItems structure
interface CartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

// Update ShopContextType to include all properties
export interface ShopContextType {
  products: Product[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
}

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined,
);
