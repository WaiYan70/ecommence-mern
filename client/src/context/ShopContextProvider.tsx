import { ReactNode } from "react";

import { ShopContext, contextValue } from "./ShopContext";

interface ShopContextProvideProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProvideProps> = ({
  children,
}) => {
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
