import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { icons } from "../assets/assets";
import CartTotal from "../components/CartTotal";

interface CartItem {
  _id: string;
  size: string;
  quality: number;
}

const Cart: React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("Something must be wrong with ShopContextProvider");
  }
  const { products, currency, cartItems, updateQuantity, navigate } = context;
  const [cartData, setCartData] = useState<CartItem[]>([]);
  useEffect(() => {
    if (products.length > 0) {
      const tempData: CartItem[] = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quality = cartItems[itemId][size];
          if (quality > 0) {
            tempData.push({
              _id: itemId,
              size,
              quality,
            });
          }
        }
      }
      setCartData(tempData);
      console.log("Cart Items from Cart: ", tempData);
    }
  }, [cartItems, products]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );
          if (!productData) {
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700">
                <p>Product is not found</p>
              </div>
            );
          }
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.title}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.originalPrice}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => {
                  const target = e.target as HTMLInputElement; // Cast to HTMLInputElement
                  if (target.value === "" || target.value === "0") return;
                  updateQuantity(item._id, item.size, Number(target.value));
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                value={item.quality}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={icons.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeorder")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              Proceed to CheckOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
