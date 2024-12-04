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

import { ReactNode, useState } from "react";
import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";

interface ShopContextProvideProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProvideProps> = ({
  children,
}) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const contextValue = {
    products,
    currency: "$",
    delivery_fee: 10,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
