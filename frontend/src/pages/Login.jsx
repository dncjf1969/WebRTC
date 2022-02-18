import { Link } from "react-router-dom";
import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
import axios from "../common/http-common";
import { saveToken } from "../common/JWT-common";
import { useNavigate } from "react-router-dom";
import Header from "../partials/Header";
// TextField;
function Login() {
  // state
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  //navigate
  const navigate = useNavigate();

  // function
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: ID,
      password: password,
    };
    login(data); 
  }
  async function login(userInfo) {
    try {
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
        },
      };
      const response = await axios.post("/members/login", userInfo, config);
      const {
        data: { accessToken },
      } = response;
      saveToken(accessToken);
      console.log(response);
      window.localStorage.setItem("id", response.data.userId);
      window.localStorage.setItem("nickname", response.data.name);
      navigate("/");
      return response;
    } catch (err) {
      alert("회원정보를 다시 확인해주세요");
      return err.response;
    }
  }
  return (
    <div>
      <Header />
      <div classNameName="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}

        {/*  Page content */}
        <main classNameName="flex-grow">
          <section classNameName="">
            <div className="min-h-screen flex flex-col items-center justify-center">
              <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <div className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800">
                  로그인
                </div>

                <div className="relative mt-10 h-px bg-gray-300">
                  <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                    <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                      오늘도 WISH와 함께 면접 준비를 해보아요!
                    </span>
                  </div>
                </div>
                <div className="mt-10">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-6">
                      <label
                        for="ID"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >
                        아이디:
                      </label>
                      <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                          <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-5 w-5"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>

                        <input
                          id="ID"
                          type="text"
                          onChange={(e) => setID(e.target.value)}
                          value={ID}
                          autoFocus
                          className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          placeholder="아이디를 입력해주세요."
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-6">
                      <label
                        for="password"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >
                        비밀번호:
                      </label>
                      <div className="relative">
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                          <span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </span>
                        </div>

                        <input
                          id="password"
                          type="password"
                          className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          placeholder="비밀번호를 입력해주세요."
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center mb-6 -mt-4">
                      <div className="flex ml-auto">
                        <Link
                          to="/reset-password"
                          className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                        >
                          비밀번호를 잊어버리셨나요?
                        </Link>
                      </div>
                    </div>

                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                      >
                        <span className="mr-2 uppercase">로그인</span>
                        <span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex justify-center items-center mt-6">
                  <Link
                    to="/signup"
                    className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
                  >
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </span>
                    <span className="ml-2">WISH 회원이 아니신가요? </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Login;
