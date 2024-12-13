import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Product } from "../assets/assets";

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  category,
  subCategory,
}) => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }
  const { products } = context;
  const [related, setRelated] = useState<Product[]>([]);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory,
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
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

export default RelatedProducts;
