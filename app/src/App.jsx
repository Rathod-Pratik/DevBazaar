import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes,ScrollRestoration } from "react-router-dom";

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
import { GET_CART, GET_ORDER, GET_PRODUCT_DATA, GET_WISHLIST } from "./Utils/Constant";
import { apiClient } from "./lib/api-Client";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

//import animation libarary
import AOS from 'aos';
import 'aos/dist/aos.css';
import Order from "./Pages/order/Order";
const App = () => {
  const {
    setOrderItem,
    setWishListItems,
    setCartItems,
    userInfo,
    setproductData,
    setLoggedIn,
  } = useAppStore();
  const [progress, setProgress] = useState();
  const [alert, setAlert] = useState("");

  const notifymessage = (message) => toast(message);

  //Function for showing alert
  const ShowAlert = async (color, message, bgcolor) => {
    setAlert({
      color: color,
      message: message,
      bgcolor: bgcolor,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
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

  //animation
  useEffect(()=>{
    AOS.init();
  },[])
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

    const fetchOrder=async()=>{
      const response=await apiClient.get(`${GET_ORDER}?user=${userInfo._id}`);

      if(response.status===200){
        setOrderItem(response.data.orders);
      }
      else{
        toast.error("Error while fatching orders")
      }
    }
    fetchOrder();

    const fetchWishList = async () => {
      try {
        const response = await apiClient.post(
          GET_WISHLIST,
          { user: userInfo._id },
          { withCredentials: true }
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
          `${GET_CART}?user=${userInfo._id}`
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
    if(userInfo){
      fetchCartList();
      fetchWishList();
    }
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(GET_PRODUCT_DATA);
        if (response.status === 200) {
          setproductData(response.data);
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
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Alert alert={alert} />
        <ScrollToTop/>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setProgress={setProgress}
                notifymessage={notifymessage}
                ShowAlert={ShowAlert}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                setProgress={setProgress}
                notifymessage={notifymessage}
                ShowAlert={ShowAlert}
              />
            }
          />
          <Route path="/billing" element={<Billing />} />
          <Route
            path="/login"
            element={<Login setProgress={setProgress} ShowAlert={ShowAlert} />}
          />
          <Route
            path="/signup"
            element={<SignUp setProgress={setProgress} ShowAlert={ShowAlert} />}
          />
          <Route path="/Product/:ProductName" element={<ProductDetail/>} />
          <Route
            path="/wishlist"
            element={
              <WishList
                setProgress={setProgress}
                notifymessage={notifymessage}
                ShowAlert={ShowAlert}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contect setProgress={setProgress} ShowAlert={ShowAlert} />
            }
          />
          {/* <Route
            path="/order"
            element={
              <Order />
            }
          /> */}
          <Route
            path="/about"
            element={<About setProgress={setProgress} ShowAlert={ShowAlert} />}
          />
          <Route
            path="/account"
            element={
              <Account setProgress={setProgress} ShowAlert={ShowAlert} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-right" />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
