import { createContext } from "react";
import { Product } from "../assets/assets";

interface CartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

export interface ShopContextType {
  navigate: (path: string) => void;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  backendURL: string;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getProductsData: () => void;
  getUserCart: (token: string) => Promise<void>;
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
}

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined,
);
