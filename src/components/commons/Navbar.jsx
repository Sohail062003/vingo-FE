import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
  FaSignOutAlt,
  FaClipboardList,
  FaBars,
  FaTimes,
  FaPlusCircle,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import apiInterceptor from "../../api/apiInterceptor";

function Navbar() {
  const { userData, city } = useSelector((state) => state.user);
  const { myShopData }= useSelector((state) => state.owner);
  const dispatch = useDispatch();

  const role = userData?.data?.user?.role;

  // const [city, setCity] = useState("Mumbai");
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await apiInterceptor.post("/auth/signout", { withCredentials: true });

      dispatch(setUserData(null));
    } catch (error) {
      console.error("logout Error: - ", error);
      dispatch(setUserData(null));
    } finally {
      setOpenProfile(false);
      setOpenMobileMenu(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* 🔮 Glass Container */}
      <div className="bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* 🔥 Logo */}
            <Link to="/" className="text-2xl font-bold text-white">
              Vin<span className="text-orange-400">go</span>
            </Link>

            {/* 🔍 Search + Location (DESKTOP ONLY) */}
            {role == "user" && (
              <div className="hidden md:flex flex-1 gap-4 justify-center px-4">
                <div className="hidden lg:flex items-center gap-1 text-gray-300">
                  <FaMapMarkerAlt className="text-orange-400" />
                  <span>{city}</span>
                </div>

                <div className="relative w-full max-w-lg">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search restaurants, dishes..."
                    className="
                    w-full pl-11 pr-4 py-2.5 rounded-2xl
                    bg-black/30 text-white
                    border border-white/20
                    focus:ring-2 focus:ring-orange-400
                    outline-none
                  "
                  />
                </div>
              </div>
            )}

            {/* 🧩 Right Section (Desktop) */}
            <div className="hidden md:flex items-center gap-5 text-white">
              {/* My Orders (WEB ONLY) */}
              {userData && role == "user" && (
                <Link
                  to="/orders"
                  className="hidden lg:flex items-center gap-2 text-sm text-gray-300 hover:text-orange-400"
                >
                  <FaClipboardList />
                  My Orders
                </Link>
              )}

              {/* Cart */}
              {userData && role == "user" && (
                <Link
                  to="/cart"
                  className="relative p-2 rounded-full hover:bg-white/10 hover:text-orange-400"
                >
                  <FaShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-pink-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    0
                  </span>
                </Link>
              )}

              {/* OWNER ACTIONS (DESKTOP) */}
              {userData && role === "owner" && (
                <>
                 {( myShopData?.data?.shop) &&
                  <Link
                    to="/owner/add-food"
                    className="
                      sm:hidden md:flex lg:flex items-center gap-2
                      px-4 py-2 rounded-xl
                      bg-gradient-to-r from-orange-500 to-pink-500
                      text-white text-sm font-medium
                      hover:opacity-90 transition
                    "
                  >
                    <FaPlusCircle />
                    Add Food
                  </Link> 
                  }

                  <Link
                    to="/owner/orders"
                    className="
                      sm:hidden  md:flex relative lg:flex items-center gap-2
                      text-sm text-gray-300
                      px-4 py-2 rounded-xl
                      border-orange-400 border 
                      hover:text-orange-400 transition hover:border-orange-300
                    "
                  >
                    <FaClock />
                    Pending Orders
                    <span
                      className="
                      absolute -top-2.5 -right-2
                      min-w-[18px] h-[18px]
                      px-1
                      flex items-center justify-center
                      rounded-full
                      bg-gradient-to-r from-orange-500 to-pink-500
                      text-[10px] font-bold text-center
                      text-white
                    "
                    >
                      0
                    </span>
                  </Link>
                </>
              )}

              {/* Profile */}
              {!userData ? (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-300 hover:text-orange-400"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <div
                    onClick={() => setOpenProfile(!openProfile)}
                    className="flex items-center gap-2 cursor-pointer p-2  rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <FaUserCircle size={24} color="" />
                    <span className="hidden sm:block text-sm">
                      {userData?.data?.user?.fullName}
                    </span>
                  </div>

                  {openProfile && (
                    <div className="absolute  right-0 mt-3 w-44 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                      <Link
                        to="/orders"
                        className="flex md:hidden items-center gap-2 px-4 py-3 text-sm text-white hover:bg-white/10"
                      >
                        <FaClipboardList />
                        My Orders
                      </Link>

                      {/* owner shop data*/} 
                      {(myShopData?.data?.shop) &&
                        <Link
                        to="/owner/create-shop"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-orange-400 hover:bg-white/10"
                      >
                         <FaEdit size={14} />
                        Edit Shop
                      </Link>
                      }
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-white/10"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 🍔 Hamburger (MOBILE ONLY) */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
            >
              {openMobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <div
        className={`
          md:hidden fixed inset-0 z-40
          bg-black/60 backdrop-blur-xl
          transition-all duration-300 ease-out
          ${openMobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpenMobileMenu(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          absolute top-16 left-4 right-4
          bg-black/80 backdrop-blur-2xl
          border border-white/20
          rounded-2xl shadow-2xl
          px-5 py-6 space-y-4
          transform transition-all duration-300 ease-out
          ${openMobileMenu ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"}
        `}
        >
          {/* 👤 USER INFO (MOBILE HEADER) */}
          {userData && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl text-white font-semibold">
                  <samp className="">
                    {userData?.data?.user?.fullName?.charAt(0)}
                  </samp>
                </div>

                <div className="leading-tight flex flex-col">
                  <p className="text-white font-semibold text-sm">
                    {userData?.data?.user?.fullName}
                  </p>
                  <p className="text-gray-400 text-xs mb-1">
                    {role === "owner" ? "Shop owner" : "view profile"}
                  </p>
                  <div className="flex lg:flex items-center gap-1 text-gray-300">
                    <FaMapMarkerAlt size={8} className="text-orange-400" />
                    <span className="text-xs">{city}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/10 my-3" />

              {/* user role SEARCH BAR (ADD HERE 👈) */}
              {role === "user" && (
                <>
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search food or restaurants..."
                      className="
                    w-full pl-11 pr-4 py-3 rounded-2xl
                    bg-black/40 text-white
                    border border-white/20
                    focus:ring-2 focus:ring-orange-400
                    outline-none transition
                  "
                    />
                  </div>
                  <div className="h-px bg-white/10 my-3" />
                </>
              )}
            </>
          )}

          {/* user role My Orders */}
          {userData && role == "user" && (
            <Link
              to="/orders"
              onClick={() => setOpenMobileMenu(false)}
              className="flex items-center gap-3 text-white/90 hover:text-orange-400 transition"
            >
              <FaClipboardList />
              My Orders
            </Link>
          )}

          {/* user role Cart */}
          {userData && role == "user" && (
            <Link
              to="/cart"
              onClick={() => setOpenMobileMenu(false)}
              className="relative flex items-center gap-3 text-white/90 hover:text-orange-400 transition"
            >
              <FaShoppingCart />
              Cart
              <span className="absolute -top-1 left-2 bg-gradient-to-r from-orange-500 to-pink-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
          )}

          {/* mobile owner role  */}
          {userData && role === "owner" && (
            <>
              <Link
                to="/owner/add-food"
                onClick={() => setOpenMobileMenu(false)}
                className="
                  flex items-center  gap-3
                  w-full px-4 py-3
                  rounded-xl
                  bg-gradient-to-r from-orange-500 to-pink-500
                  text-white font-semibold text-sm
                  shadow-lg
                  hover:opacity-90 transition
                "
              >
                <FaPlusCircle size={18} />
                Add Food Item
              </Link>

              {/* ⏳ Pending Orders */}
              <Link
                to="/owner/orders"
                onClick={() => setOpenMobileMenu(false)}
                className="
                  relative flex items-center gap-3
                  w-full px-4 py-3
                  rounded-xl
                  bg-white/5
                  text-white/90 text-sm
                  hover:bg-white/10 hover:text-orange-400
                  transition
                "
              >
                <FaClock size={16} />
                Pending Orders
                <span
                  className="
                  absolute top-2 right-3
                  min-w-[20px] h-5
                  px-1
                  flex items-center justify-center
                  rounded-full
                  bg-gradient-to-r from-orange-500 to-pink-500
                  text-white text-xs font-bold
                "
                >
                  0
                </span>
              </Link>
              {/* ⏳ Pending Orders */}
              <Link
                to="/owner/create-shop"
                onClick={() => setOpenMobileMenu(false)}
                className="
                  relative flex items-center gap-3
                  w-full px-4 py-3
                  rounded-xl
                  bg-white/5
                  text-white/90 text-sm
                  hover:bg-white/10 hover:text-orange-400
                  transition
                "
              >
                <FaEdit size={16} />
                Edit Shop
                
              </Link>
            </>
          )}

          {userData && <div className="h-px bg-white/10 my-2" />}

          {/* 🚪 Logout */}
          {userData && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-400 hover:text-red-500 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ✨ Glow */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-orange-500/25 to-pink-500/25 blur-3xl -z-10" />
    </nav>
  );
}

export default Navbar;
