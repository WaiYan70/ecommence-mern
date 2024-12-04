import { useCallback, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { icons, Product } from "../assets/assets";

import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection: React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }
  const { search, showSearch } = context;
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = useCallback(() => {
    let productsCopy = context?.products?.slice() ?? [];
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }
    setFilterProducts(productsCopy);
  }, [context?.products, category, subCategory, search, showSearch]);

  const sortProducts = () => {
    const filterProductsCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(
          filterProductsCopy.sort((a, b) => a.originalPrice - b.originalPrice),
        );
        break;
      case "high-low":
        setFilterProducts(
          filterProductsCopy.sort((a, b) => b.originalPrice - a.originalPrice),
        );
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    if (context?.products) {
      setFilterProducts(context.products);
    }
  }, [context]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filter
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={icons.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-grey-300 pl-5 py-3 mt-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-grey-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                value={"Jean"}
                onChange={toggleSubCategory}
              />
              Jean
            </p>
            <p className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                value={"Tops"}
                onChange={toggleSubCategory}
              />
              Tops
            </p>
            <p className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                value={"Blouse"}
                onChange={toggleSubCategory}
              />
              Blouse
            </p>
            <p className="flex gap-2">
              <input
                className="w-4"
                type="checkbox"
                value={"Tee"}
                onChange={toggleSubCategory}
              />
              Tee
            </p>
          </div>
        </div>
      </div>
      {/* List of Products Item */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              title={item.title}
              image={item.image}
              originalPrice={item.originalPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
