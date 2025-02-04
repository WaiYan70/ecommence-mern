import { ReactNode, useCallback, useEffect, useState } from "react";
import { ShopContext, ShopContextType } from "./ShopContext";
import { Product } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [cartItems, setCartItems] = useState<CartItems>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Cart Items From ShopContextProvider: ", cartItems);
  }, [cartItems]);

  const updatedCartState = (updater: (prev: CartItems) => CartItems) => {
    setCartItems((prevCartItems) => updater(prevCartItems));
  };

  const addToCart = (itemId: string, size: string): void => {
    if (!size) {
      toast.error("Please select the size before adding into the cart");
      return;
    }
    updatedCartState((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      updatedCartItems[itemId] = updatedCartItems[itemId] || {};
      updatedCartItems[itemId][size] =
        (updatedCartItems[itemId][size] || 0) + 1;
      return updatedCartItems;
    });
  };

  const getCartCount = (): number =>
    Object.values(cartItems).reduce(
      (total, sizes) =>
        total +
        Object.values(sizes).reduce(
          (subTotal, quantity) => subTotal + quantity,
          0,
        ),
      0,
    );

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    updatedCartState((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (quantity > 0) {
        updatedCartItems[itemId] = updatedCartItems[itemId] || {};
        updatedCartItems[itemId][size] = quantity;
      } else {
        if (updatedCartItems[itemId]) {
          delete updatedCartItems[itemId][size];
          if (Object.keys(updatedCartItems[itemId]).length === 0) {
            delete updatedCartItems[itemId];
          }
        }
      }
      return updatedCartItems;
    });
  };

  const getCartAmount = (): number =>
    Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const itemInfo = products.find((product) => product._id === itemId) ?? {
        originalPrice: 0,
      };
      const totalItem = Object.values(sizes).reduce(
        (subTotal, quantity) => subTotal + quantity * itemInfo.originalPrice,
        0,
      );
      return total + totalItem;
    }, 0);

  const getProductsData = useCallback(async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.listOfProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [backendURL]);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  const contextValue: ShopContextType = {
    products,
    setProducts,
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
    backendURL,
    getProductsData,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
