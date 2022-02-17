import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../common/http-common";
import Header from "../partials/Header";

function ResetPassword() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get(`/members/findPW?memberEmail=${email}&memberId=${id}`)
      .then((res) => {
        alert("입력하신 이메일로 임시 비밀번호를 보냈습니다.");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.response);
        switch (e.response.status) {
          case 501:
            alert("회원 정보를 찾지 못하였습니다.");
            break;
          case 506:
            alert("이메일을 다시 확인해주세요.");
            break;
          default:
            alert("알 수 없는 오류가 발생하였습니다.");
        }
      });
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="mb-4 font-bold">비밀번호를 잊어버리셨나요?</h2>
                <p className="text-xl text-gray-600">
                  회원가입시 입력한 정보를 넣어주세요.{" "}
                </p>
                <p className="text-xl text-gray-600">
                  WISH가 당신의 이메일로 임시 비밀번호를 보내드립니다.
                </p>
              </div>

              {/* Form */}
              <div className="mx-96">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col mb-6">
                    <label
                      for="id"
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
                        id="id"
                        type="text"
                        onChange={(e) => setId(e.target.value)}
                        value={id}
                        autoFocus
                        required
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder="회원가입시 입력한 아이디"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-6">
                    <label
                      for="email"
                      className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                    >
                      이메일:
                    </label>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <span>
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
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </span>
                      </div>

                      <input
                        id="email"
                        type="email"
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="회원가입시 입력한 이메일"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex w-full">
                    <button
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 uppercase">임시 비밀번호 발급</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ResetPassword;
