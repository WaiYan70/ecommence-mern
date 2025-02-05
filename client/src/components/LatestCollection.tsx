import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Product } from "../assets/assets";

import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection: React.FC = () => {
  const context = useContext(ShopContext);
  // console.log(context);
  if (!context) {
    throw new Error("Something is wrong with Shop Context Provider");
  }
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (context?.products) {
      setLatestProducts(context.products.slice(0, 10));
    }
  }, [context?.products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          dolores facere quam hic.
        </p>
      </div>
      {/* Rendering Product Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            title={item.title}
            originalPrice={item.originalPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
