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
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: (path: string) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined,
);
