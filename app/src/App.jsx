import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

//Import Pages
import Alert from "./Component/Alert/Alert";
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

import Cookies from "js-cookie";

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

const App = () => {
  const {
    setWishListItems,
    setCartItems,
    userInfo,
    setproductData,
    setLoggedIn,
    progress,
    setProgress
  } = useAppStore();
  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1]; // The payload is the second part of the JWT
      const decodedPayload = JSON.parse(atob(payload)); // Decode from Base64
      return decodedPayload;
    } catch (error) {
      console.error("Invalid JWT:", error);
      return null;
    }
  };

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  //animation
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      const decoded = decodeJWT(jwt); // Decode the JWT
      if (decoded) {
        const isExpired = decoded.exp * 1000 < Date.now(); // Check expiration
        if (isExpired) {
          Cookies.remove("jwt"); // Remove expired cookie
          setLoggedIn(false); // Update Zustand state
        } else {
          setLoggedIn(true); // JWT is valid
        }
      } else {
        Cookies.remove("jwt"); // Remove invalid JWT
        setLoggedIn(false);
      }
    }
  }, [setLoggedIn]);

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
    if (userInfo) {
      fetchCartList();
      fetchWishList();
    }
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(GET_PRODUCT_DATA);
        if (response.status === 200) {
          setproductData(response.data.Products);
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
      <Alert alert={alert} />
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
      </Routes>
      <ToastContainer position="bottom-right" />
      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;
