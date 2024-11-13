import { Link } from "react-router-dom";
import React, { useContext } from "react";

import { ShopContext } from "../context/ShopContext";

interface ProductItemProps {
  id: number;
  image: string[];
  title: string;
  originalPrice: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  title,
  originalPrice,
}) => {
  const context = useContext(ShopContext);
  if (!context) {
    return null;
  }
  const { currency } = context;
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{title}</p>
      <p className="text-sm font-medium">
        {currency} {originalPrice}
      </p>
    </Link>
  );
};

export default ProductItem;
