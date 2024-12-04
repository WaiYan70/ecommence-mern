import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }
  return (
    <div className="flex border-2 border-black-500">
      {/* Image Side */}
      <div className="flex border-2 border-red-500 m-5">
        {/* Big Image */}
        <div>
          <h2>Big Image</h2>
          <img src="" alt="" />
        </div>
        {/* Small Image */}
        <div>
          {/* Small Image - 1 */}
          <div>
            <h3>Small Image</h3>
            <img src="" alt="" />
          </div>
        </div>
      </div>
      {/* Description Side */}
      <div className="flex flex-col border-2 border-blue-500 m-5">
        <h2>Product's title</h2>
        <h3>Prodcut's type/category</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio quam
          ab porro eius officia harum quisquam aliquid quas itaque blanditiis.
        </p>
      </div>
    </div>
  );
};

export default Product;
