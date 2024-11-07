// import { createContext, ReactNode } from "react";

// import { products } from "../assets/assets";

// export const ShopContext = createContext({});

// interface ShopContextProviderProps {
//   children: ReactNode;
// }

// const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
//   children,
// }) => {
//   const currency = "$";
//   const delivery_fee = 10;

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//   };

//   return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;

import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext({});
export const currency = "$";
export const delivery_fee = 10;
export const contextValue = {
  products,
  currency,
  delivery_fee,
};
