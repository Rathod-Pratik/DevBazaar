import { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaHome, FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineShoppingCart } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../Store";
import { apiClient } from "../../lib/api-Client";
import { LOGOUT } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { LuUser } from "react-icons/lu";

const navLinkClass = ({ isActive }) =>
  `inline-flex w-fit items-center justify-center rounded-lg px-3 py-2 font-medium transition-all ${isActive ? "bg-red-600 text-white shadow-sm" : "text-gray-800 hover:bg-red-50 hover:text-red-600"}`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    userInfo,
    wishListItems,
    cartItems,
    setUserInfo,
    clearCartItems,
    clearWishListItems,
    setLoggedIn,
  } = useAppStore();

  const toggleModal = () => setOpenModal((prev) => !prev);
  const closeModal = () => setOpenModal(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      const response = await apiClient.get(LOGOUT, { withCredentials: true });
      if (response.status === 200) {
        setUserInfo(undefined);
        clearCartItems();
        clearWishListItems();
        setLoggedIn(false);
        closeModal();
        closeMenu();
        localStorage.removeItem("auth-storage");
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  const requireLogin = (event, routeName) => {
    if (userInfo) return;
    event.preventDefault();
    toast.warning(`Please login to access ${routeName}.`);
    navigate("/login");
  };

  const modalRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  if (isAdminPage) {
    return (
      <header className="backdrop-blur-lg border-b border-gray-200 py-3 sticky top-0 z-50 bg-white/95">
        <div className="flex justify-between items-center mx-auto w-[90vw]">
          <Link to="/admin" className="text-2xl font-bold text-gray-800">
            DevBazzar
          </Link>
          <div className="flex gap-2 items-center">
            <p className="rounded-full text-orange-500 px-4 py-2 hidden md:block">
              Welcome, {userInfo?.FirstName} {userInfo?.LastName}
            </p>
            <Link
              to="/"
              className="p-2 rounded-full bg-red-500 hover:bg-orange-600 transition"
              aria-label="Go to home"
            >
              <FaHome className="text-white text-2xl" />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-white">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            DevBazzar
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/product" className={navLinkClass}>
              Product
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            {!userInfo && (
              <NavLink to="/signup" className={navLinkClass}>
                Sign up
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to={userInfo ? "/cart" : "/login"}
              onClick={(event) => requireLogin(event, "cart")}
              className="relative"
            >
              <MdOutlineShoppingCart className="text-gray-600 text-xl hover:text-red-500 transition-all" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              to={userInfo ? "/wishlist" : "/login"}
              onClick={(event) => requireLogin(event, "wishlist")}
              className="relative"
            >
              <FaRegHeart className="text-gray-600 text-xl hover:text-red-500 transition-all" />
              {wishListItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {wishListItems.length}
                </span>
              )}
            </Link>
            {userInfo && (
              <LuUser
                className="rounded-full bg-red-600 p-1 text-2xl text-white cursor-pointer"
                onClick={toggleModal}
              />
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-black md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <IoMenu className="text-[34px]" />
            </button>
          </div>

          <div
            className={`fixed inset-0 z-50 bg-black/45 transition-opacity duration-300 md:hidden ${
              isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={closeMenu}
          >
            <div
              ref={menuRef}
              className={`absolute right-0 top-0 h-full w-[86vw] max-w-[340px] overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ease-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex justify-end">
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="rounded-md p-2 text-black hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <IoMenu className="text-[34px]" />
                </button>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <NavLink to="/" end onClick={closeMenu} className={navLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/product" onClick={closeMenu} className={navLinkClass}>
                  Product
                </NavLink>
                <NavLink to="/contact" onClick={closeMenu} className={navLinkClass}>
                  Contact
                </NavLink>
                <NavLink to="/about" onClick={closeMenu} className={navLinkClass}>
                  About
                </NavLink>
                {!userInfo && (
                  <NavLink to="/signup" onClick={closeMenu} className={navLinkClass}>
                    Sign up
                  </NavLink>
                )}
                {userInfo && (
                  <NavLink to="/order" onClick={closeMenu} className={navLinkClass}>
                    Order
                  </NavLink>
                )}
                {userInfo && (
                  <NavLink to="/cancelorder" onClick={closeMenu} className={navLinkClass}>
                    Cancel Order
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Model for account */}
      <div className="relative">
        {openModal && (
          <div
            ref={modalRef}
            className="right-[45px] fixed top-12 bg-white backdrop-blur-sm shadow-lg rounded-md p-4 w-48 z-50"
          >
            <ul className="list-none">
              <li className="py-2">
                <Link
                  onClick={closeModal}
                  to="/account"
                  className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
                >
                  <LuUser />
                  Manage My Account
                </Link>
              </li>
              <li className="py-2">
                <Link
                  onClick={closeModal}
                  to="/order"
                  className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
                >
                  <FiShoppingBag />
                  My Orders
                </Link>
              </li>
              <li className="py-2">
                <Link
                  onClick={closeModal}
                  to="/cancelorder"
                  className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm"
                >
                  <MdOutlineCancel />
                  My Cancellations
                </Link>
              </li>
              {userInfo && (
                <li className="py-2">
                  <Link
                    to="/"
                    onClick={async () => {
                      closeModal();
                      await handleLogout();
                    }}
                    className="text-gray-700 hover:text-red-600 transition flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <BiLogOut />
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
