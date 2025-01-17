import React, { useState,useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Alert from "./Component/Alert/Alert";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Contect from "./Pages/ContectUs/Contect";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import WishList from "./Pages/WishList/WishList";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import LoadingBar from "react-top-loading-bar";
import Cookies from "js-cookie";

import { useAppStore } from "./Store";
import Account from "./Pages/Account/Account";

const App = () => {

  const {setLoggedIn} =useAppStore();
  const [progress, setProgress] = useState();
  const [alert, setAlert] = useState("");

  const notifymessage = (message) => toast(message);
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
          <Route
            path="/login"
            element={<Login setProgress={setProgress} ShowAlert={ShowAlert} />}
          />
          <Route
            path="/signup"
            element={<SignUp setProgress={setProgress} ShowAlert={ShowAlert} />}
          />
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
          <Route
            path="/about"
            element={<About setProgress={setProgress} ShowAlert={ShowAlert} />}
          />
          <Route
            path="/account"
            element={<Account setProgress={setProgress} ShowAlert={ShowAlert} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer position="bottom-right" />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
