import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Contect from "./Pages/ContectUs/Contect";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import WishList from "./Pages/WishList/WishList";
const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/contact" element={<Contect />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </>
  );
};

export default App;
