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

  const { search, showSearch, products } = context;
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<
    "relavent" | "low-high" | "high-low"
  >("relavent");

  // Toggle Category
  const toggleCategory = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCategory((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value],
      );
    },
    [],
  );

  // Toggle SubCategory
  const toggleSubCategory = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSubCategory((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value],
      );
    },
    [],
  );

  // Apply Filter Logic
  const applyFilter = useCallback(() => {
    let filtered = products;

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    setFilterProducts(filtered);
  }, [products, category, subCategory, search, showSearch]);

  // Sort Products Logic
  const sortProducts = useCallback(() => {
    const sorted = [...filterProducts];

    if (sortType === "low-high") {
      sorted.sort((a, b) => a.originalPrice - b.originalPrice);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.originalPrice - a.originalPrice);
    }

    setFilterProducts(sorted);
  }, [filterProducts, sortType]);

  // Effect to Apply Filter When Dependencies Change
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  // Effect to Apply Sorting
  useEffect(() => {
    sortProducts();
  }, [sortProducts]);

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
          className={`border pl-5 py-3 mt-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          {["Men", "Women", "Kids"].map((cat) => (
            <label key={cat} className="flex gap-2 text-sm text-gray-700">
              <input type="checkbox" value={cat} onChange={toggleCategory} />
              {cat}
            </label>
          ))}
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          {["Jean", "Tops", "Blouse", "Tee"].map((sub) => (
            <label key={sub} className="flex gap-2 text-sm text-gray-700">
              <input type="checkbox" value={sub} onChange={toggleSubCategory} />
              {sub}
            </label>
          ))}
        </div>
      </div>

      {/* List of Product Items */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          <select
            onChange={(e) =>
              setSortType(
                e.target.value as "relavent" | "low-high" | "high-low",
              )
            }
            className="border px-2"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
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
