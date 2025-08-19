import React, { useState, useEffect, Children } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

//Import Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Contect from "./Pages/ContectUs/Contect";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import WishList from "./Pages/WishList/WishList";
import Account from "./Pages/Account/Account";
import Billing from "./Pages/Billing/Billing";
import NotFound from "./Component/404 NotFound/NotFound";
import ScrollToTop from "./Component/Scroll/scroll";

//import Toast
import { ToastContainer, toast } from "react-toastify";

//import Component
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import LoadingBar from "react-top-loading-bar";

//import states and constants
import { useAppStore } from "./Store";
import { GET_CART, GET_PRODUCT_DATA, GET_WISHLIST } from "./Utils/Constant";
import { apiClient } from "./lib/api-Client";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

//import animation libarary
import AOS from "aos";
import "aos/dist/aos.css";
import Order from "./Pages/order/Order";
import Product from "./Pages/Product/Product";
import CancelOrder from "./Pages/order/CancelOrder";
import DashBoard from "./Pages/Admin/DashBoard";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Categories from "./Pages/Admin/Categories";
import Products from "./Pages/Admin/Products";
import Users from "./Pages/Admin/Users";
import Reviews from "./Pages/Admin/Reviews";
import Contacts from "./Pages/Admin/Contacts";
import Profile from "./Pages/Admin/Profile";
import AdminNavbar from "./Component/Navbar/AdminNavbar";
import Orders from "./Pages/Admin/Order";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";

const App = () => {
  const {
    setWishListItems,
    setCartItems,
    userInfo,
    setProductData,
    progress,
    setProgress,
  } = useAppStore();

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  //animation
  useEffect(() => {
    AOS.init();
  }, []);

  //Fetch WishList and Cart Data
  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await apiClient.post(
          GET_WISHLIST,
          { user: userInfo._id },
          { withCredentials: true },
          { timeout: 10000 }
        );
        if (response.status === 200) {
          setWishListItems(response.data.wishList);
        } else {
          toast.error("Failed to fetch WishList");
        }
      } catch (error) {
        console.log("Error fetching wishlist:", error);
      }
    };

    const fetchCartList = async () => {
      try {
        const response = await apiClient.get(
          `${GET_CART}?user=${userInfo._id}`,
          { timeout: 10000 }
        );
        if (response.status == 200) {
          setCartItems(response.data);
        } else {
          toast.error("Failed to fetch CartData");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (typeof userInfo !== "undefined") {
      fetchCartList();
      fetchWishList();
    }
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(GET_PRODUCT_DATA);
        if (response.status === 200) {
          setProductData(response.data.Products);
        } else {
          toast.error(
            "An error occurred while loading products. Please try again later."
          );
        }
      } catch (error) {
        toast.error("Failed to fetch products. Check your connection.");
      }
    };
    fetchProductData();
  }, []);

  return (
    <>
      {!isAdminPage && <Navbar />}
      {isAdminPage && <AdminNavbar />}
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ScrollToTop />
      <Routes>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Product/:ProductName" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/contact" element={<Contect />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cancelorder" element={<CancelOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="category" element={<Categories />} />
            <Route path="order" element={<Orders />} />
            <Route path="product" element={<Products />} />
            <Route path="user" element={<Users />} />
            <Route path="review" element={<Reviews />} />
            <Route path="contact" element={<Contacts />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;
