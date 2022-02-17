import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, deleteToken } from "../common/JWT-common";
import WaitingRoomModal from "./WaitingRoomModal";

function Header() {
  const [top, setTop] = useState(true);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const modalClose = () => {
    setRoomModalOpen(!roomModalOpen);
  };
  const jwtToken = getToken();
  const navigate = useNavigate();
  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  function handleLogout() {
    deleteToken();
    window.localStorage.removeItem("nickname")
    window.localStorage.removeItem("id")
    navigate("/");
  }

  function handleRoomEnterBtn() {
    navigate("/enter")
  }
  return (
    <header
      style={{ fontFamily: "Noto Sans CJK KR" }}
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out  ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 ">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-4xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-blue-500 to-teal-200"
              aria-label="Cruip"
            >
              WISH
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow ">
            <ul className="flex flex-grow gap-3 justify-end flex-wrap items-center">
              {jwtToken ? (
                <>
                  <li>
                    <button
                      onClick={modalClose}
                      className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-75"
                    >
                      방 만들기
                    </button>
                    {roomModalOpen && (
                      <WaitingRoomModal
                        modalClose={modalClose}
                      ></WaitingRoomModal>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={handleRoomEnterBtn}
                      className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-75"
                    >
                      방 참여
                    </button>
                  </li>
                  <li className="flex items-center">
                    <Link
                      to="/mypage"
                      className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      마이페이지
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-2 px-4 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"                    >
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className=" btn-sm py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 shadow hover:shadow-lg "
                    >
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="btn-sm shadow hover:shadow-lg font-semibold focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 rounded-lg text-gray-200 bg-gray-900 hover:bg-gray-800 "
                    >
                      <span>회원가입</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
