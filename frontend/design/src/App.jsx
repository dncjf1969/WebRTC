import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

import AOS from "aos";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import WaitingList from "./pages/WaitingList";
import Room from "./pages/roomTest2/room";
import MyPage from "./pages/mypage/Mypage";
// import CheckPassword from './pages/CheckPassword';
import ModifyUserInfo from './pages/ModifyUserInfo';

function App() {
  const location = useLocation();

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
        <Route path="/waitingroom" element={<Room />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route path="/checkpassword" element={<CheckPassword/>} /> */}
        <Route path="/modifyuserinfo" element={<ModifyUserInfo/>} />

      </Routes>
    </>
  );
}

export default App;
