import { Link } from "react-router-dom";
import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
import axios from "../common/http-common";
import { saveToken } from "../common/JWT-common";
import { useNavigate } from "react-router-dom";
import Header from "../partials/Header";

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
    login(data); // LoginSlice에서 가져온 로그인 액션, login(data) 는 createAsyncThunk로 만든것.
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
      window.localStorage.setItem('id', response.data.userId);
      window.localStorage.setItem('nickname', response.data.name);
      navigate("/");
      return response;
    } catch (err) {
      return err.response;
    }
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}

        {/*  Page content */}
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">로그인</h1>
                </div>

                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="ID"
                        >
                          아이디
                        </label>
                        <input
                          id="ID"
                          type="text"
                          onChange={(e) => setID(e.target.value)}
                          value={ID}
                          autoFocus
                          className="rounded-lg form-input w-full text-gray-800"
                          placeholder="아이디를 입력해주세요."
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <div className="flex justify-between">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="password"
                          >
                            비밀번호
                          </label>
                          <Link
                            to="/reset-password"
                            className="text-sm font-medium text-blue-600 hover:underline"
                          >
                            비밀번호를 잊어버리셨나요?
                          </Link>
                        </div>
                        <input
                          id="password"
                          type="password"
                          className="rounded-lg form-input w-full text-gray-800"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          placeholder="비밀번호를 입력해주세요."
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button className="btn text-white bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold rounded-lg">
                          로그인
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="text-gray-600 text-center mt-6">
                    WISH 회원이 아니신가요?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                    >
                      지금 가입하세요
                    </Link>
                  </div>
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
