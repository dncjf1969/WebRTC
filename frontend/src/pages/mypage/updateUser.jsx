import { useState, React, useEffect } from "react";
import { Link } from "react-router-dom";
// $ npm i react-redux
// import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// $ npm i styled-components
import styled from "styled-components";
// $ npm install @material-ui/core
import { Button } from "@material-ui/core";
// $ npm i react-material-ui-form-validator
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// $ npm i @material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";
// import { signup, checkEmail } from '../authSlice';
import axios from "../../common/http-common";
import Header from "../../partials/Header";
import SelectCharacter from "../SelectCharacter";
import DeleteModal from "./DeleteModal";
// style
const Wrapper = styled.div`
  background-color: Bisque;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  height: 80%;
  width: 80%;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  font-weight: bold;
`;

const useStyles = makeStyles({
  validator: {
    fontSize: "1.5em",
  },
});

function UpdateUser() {
  // local state
  const [email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");

  // 인증후에 ID, 닉네임 다시 입력시 인증 다시받도록 하기위함
  useEffect(() => {
    setCheckNickname(false);
  }, [Nickname]);

  const [confirmNumber, setConfirmNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [checkNickname, setCheckNickname] = useState(false);
  const [characterNumber, setCharacterNumber] = useState("");

  const classes = useStyles();
  // const dispatch = useDispatch();
  // useState는 리액트 Hook의 하나이며, 상태 관리의 역할을 한다.
  // useState는 항상 2개의 value를 return한다. 첫번째 value는 state이고, 두번째 value는 modifier이다.
  // 생성한 action을 useDispatch를 통해 발생시킬 수 있다
  // ex. <button onClick={()=>dispatch({type:액션타입})}>
  const navigate = useNavigate();

  // setState when user change input

  function handleNickname(event) {
    const { value } = event.target;
    if (value.length < 11) {
      setNickname(value);
      return true;
    }
    return false;
  }
  // 닉네임 최대 10글자

  const update = async (userInfo) => {
    // 액션 이름을 정의해 주도록 합니다.
    // 비동기 호출 함수를 정의합니다.
    console.log(userInfo);
    await axios
      .put("/members", userInfo, {
        headers: {
          Authorization: window.localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        alert("회원정보 변경 완료! 다시 로그인 해주세요!");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("nickname");
        navigate("/login");
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  // submit when user click button
  function handleSubmit(event) {
    event.preventDefault();
    if (checkNickname && characterNumber) {
      const data = {
        email: email,
        id: window.localStorage.getItem("id"),
        name: Nickname,
        password: password,
        characterNumber: characterNumber,
      };
      update(data);
    } else if (!checkNickname && characterNumber) {
      alert("닉네임 중복을 확인해주세요");
    } else if (checkNickname && !characterNumber) {
      alert("캐릭터를 선택해주세요");
    }
  }
  // event.preventDefault() = 기본 클릭 동작 방지하기
  // '/signup' -> 비동기 호출 실시

  async function handleNicknameCheck() {
    if (Nickname === "") {
      alert("닉네임을 입력해주세요");
    } else {
      await axios
        .get(`/members/check/name?name=${Nickname}`)
        .then((res) => {
          console.log(res);
          alert("사용 가능한 닉네임입니다");
          setCheckNickname(true);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          alert("이미 존재하는 닉네임입니다");
          setCheckNickname(false);
          return err;
        });
    }
  }

  // validation (same password)
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [repeatPassword]);
  // useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다.
  // 쉽게 말하면, 클래스형 컴포넌트의 componentDidMount + componentDidUpdate 를 합친 형태라고 이해하면 된다!
  // 비밀번호 확인 창에 "정보를 입력해주세요" 가 뜨게 하는 기능
  // ValidationForm = material.UI

  // validation (maxlength)
  useEffect(() => {
    ValidatorForm.addValidationRule("maxNumber", (value) => {
      if (value.length > 10) {
        return false;
      }
      return true;
    });
  }, [Nickname]);

  //잘 모르겠다.
  //없어도 잘 돌아가긴 함.
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main classNameName="flex-grow">
        <section classNameName="">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
              <div className="font-bold self-center text-xl sm:text-2xl  mt-16 uppercase text-gray-800">
                회원정보 수정
              </div>

              <div className="relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase"></span>
                </div>
              </div>
              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  {/* 닉네임 작성 */}
                  <div className="flex flex-col mb-3">
                    <label
                      for="name"
                      className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                    >
                      새 닉네임:
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
                        id="name"
                        type="text"
                        onChange={handleNickname}
                        value={Nickname}
                        autoFocus
                        style={{
                          width: "66%",

                          float: "left",
                        }}
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder="아이디를 입력해주세요."
                      />
                      <button
                        type="button"
                        style={{
                          width: "30%",
                          height: "42px",
                          float: "right",
                        }}
                        onClick={handleNicknameCheck}
                        className="btn text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 text-white font-semibold rounded-lg"
                      >
                        <span>중복확인</span>
                      </button>
                    </div>
                  </div>
                  {/* 이메일 작성 */}
                  <div className="flex flex-col mb-3">
                    <label
                      for="email"
                      className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                    >
                      새 이메일:
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
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>

                      <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        autoFocus
                        style={{
                          width: "100%",

                          float: "left",
                        }}
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder="이메일을 입력해주세요."
                      />
                    </div>
                  </div>
                  {/* 비밀번호 작성 */}
                  <div className="flex flex-col mb-3">
                    <label
                      for="password"
                      className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                    >
                      새 비밀번호:
                    </label>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
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
                      </div>

                      <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoFocus
                        style={{
                          width: "100%",

                          float: "left",
                        }}
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder="비밀번호를 입력해주세요."
                      />
                    </div>
                  </div>
                  {/* 2차비밀번호 작성 */}
                  <div className="flex flex-col mb-3">
                    <label
                      for="passwordCheck"
                      className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                    >
                      비밀번호 확인:
                    </label>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
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
                      </div>

                      <input
                        id="passwordCheck"
                        type="password"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        autoFocus
                        style={{
                          width: "100%",

                          float: "left",
                        }}
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder="비밀번호를 입력해주세요."
                      />
                    </div>
                    <div className="mt-4">
                      <SelectCharacter
                        setCharacterNumber={setCharacterNumber}
                      />
                    </div>
                  </div>

                  <div className="flex w-full">
                    <button
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 uppercase">회원정보 수정</span>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UpdateUser;
