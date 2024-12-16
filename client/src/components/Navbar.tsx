import { useContext, useState } from "react";
import { icons } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("Something is wrong in ShopContext or ShopContextProvder");
  }
  const { setShowSearch, getCartCount } = context;
  const [visibleSideBar, setVisibleSideBar] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={icons.logo_black} className="w-36" alt="" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={icons.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <img src={icons.profile_icon} className="w-5 cursor-pointer" alt="" />
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Order</p>
              <p className="cursor-pointer hover:text-black">LogOut</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={icons.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px] aspect-square">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisibleSideBar(true)}
          src={icons.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* SideBar for Smaller Screens for Responsive */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visibleSideBar ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisibleSideBar(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={icons.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisibleSideBar(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisibleSideBar(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisibleSideBar(false)}
            className="py-2 pl-6 border"
            to="contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
