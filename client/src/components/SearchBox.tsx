import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

import { icons } from "../assets/assets";

const SearchBox = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }
  const { search, setSearch, showSearch, setShowSearch } = context;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("contact")) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [location]);

  return (
    <>
      {/* Search Box and Overlay */}
      <div>
        {/* Overlay */}
        <div
          onClick={() => setShowSearch(false)}
          className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
            showSearch && isSearchOpen
              ? "opacity-50 visible"
              : "opacity-0 invisible"
          }`}
        ></div>

        {/* Search Box */}
        <div
          className={`fixed inset-y-0 right-0 bg-white shadow-lg z-50
            transition-transform duration-300 transform ${
              showSearch && isSearchOpen ? "translate-x-0" : "translate-x-full"
            }
            w-full md:w-1/2 lg:w-1/2`}
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Search</h2>
            <img
              onClick={() => setShowSearch(false)}
              src={icons.cross_icon}
              className="w-6 h-6 cursor-pointer"
              alt="Close Icon"
            />
          </div>

          {/* Input Field */}
          <div className="p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Searching Items..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
