import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.scss";

import AOS from "aos";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import WaitingList from "./pages/WaitingList";
import Room from "./pages/roomTest2/room";
import MyPage from "./pages/mypage/Mypage";
import NotFound from "./pages/Page404";
import { createTheme } from "@material-ui/core";
function App() {
  const location = useLocation();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 400,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/waitinglist/:roomType" element={<WaitingList />} />
        <Route path="/waitingroom" element={<Room theme={theme} />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
