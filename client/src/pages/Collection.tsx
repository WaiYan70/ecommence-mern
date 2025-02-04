import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ShopContext } from "../context/ShopContext";
import { icons, Product } from "../assets/assets";

import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

type SortType = "relavent" | "low-high" | "high-low";

const Collection: React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }
  const { search, showSearch, products } = context;
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>("relavent");

  const toggleCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCategory((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value],
      );
    },
    [],
  );

  const toggleSubCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSubCategory((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value],
      );
    },
    [],
  );

  const filterFunctions = useMemo(
    () => ({
      searchFilter: (items: Product[], searchTerms: string) =>
        items.filter((item) => {
          item.title.toLowerCase().includes(searchTerms.toLowerCase());
        }),
      categoryFilter: (items: Product[], categories: string[]) =>
        categories.length === 0
          ? items
          : items.filter((item) => categories.includes(item.category)),
      subCategoryFilter: (items: Product[], subCategories: string[]) =>
        subCategories.length === 0
          ? items
          : items.filter((item) => subCategories.includes(item.subCategory)),
      sortProducts: (items: Product[], type: SortType) => {
        const sortedItems = [...items];
        switch (type) {
          case "low-high":
            return sortedItems.sort(
              (a, b) => a.originalPrice - b.originalPrice,
            );
          case "high-low":
            return sortedItems.sort(
              (a, b) => b.originalPrice - a.originalPrice,
            );
          default:
            return sortedItems;
        }
      },
    }),
    [],
  );

  useEffect(() => {
    if (!products) return;
    let filteredProducts = [...products];
    if (showSearch && search) {
      filteredProducts = filterFunctions.searchFilter(filteredProducts, search);
    }
    filteredProducts = filterFunctions.categoryFilter(
      filteredProducts,
      category,
    );
    filteredProducts = filterFunctions.subCategoryFilter(
      filteredProducts,
      subCategory,
    );
    filteredProducts = filterFunctions.sortProducts(filteredProducts, sortType);
    setFilterProducts(filteredProducts);
  }, [
    products,
    category,
    subCategory,
    search,
    showSearch,
    sortType,
    filterFunctions,
  ]);

  useEffect(() => {
    if (products?.length) {
      setFilterProducts(products);
    }
  }, [products]);

  const renderCheckBoxItem = useCallback(
    (
      value: string,
      handler: (event: React.ChangeEvent<HTMLInputElement>) => void,
      isCategory: boolean,
    ) => (
      <p className="flex gap-2" key={value}>
        <input
          className="w-4"
          type="checkbox"
          value={value}
          onChange={handler}
          checked={
            isCategory ? category.includes(value) : subCategory.includes(value)
          }
        />
        {value}
      </p>
    ),
    [category, subCategory],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p>this is testing</p>
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
            {["Men", "Women", "Kids"].map((value) =>
              renderCheckBoxItem(value, toggleCategory, true),
            )}
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-grey-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Jean", "T-Shirt", "Blouse", "Tee"].map((value) =>
              renderCheckBoxItem(value, toggleSubCategory, false),
            )}
          </div>
        </div>
      </div>
      {/* List of Products Item */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          <select
            onChange={(event) => setSortType(event.target.value as SortType)}
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
