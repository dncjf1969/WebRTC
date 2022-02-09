import { useState, React, useEffect,} from 'react';
import { Link } from 'react-router-dom';
// $ npm i react-redux
// import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// $ npm i styled-components
import styled from 'styled-components';
// $ npm install @material-ui/core
import { Button } from '@material-ui/core';
// $ npm i react-material-ui-form-validator
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// $ npm i @material-ui/core/styles
import { makeStyles } from '@material-ui/core/styles';
// import { signup, checkEmail } from '../authSlice';
import axios from '../common/http-common'
import Header from '../partials/Header';

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
    fontSize: '1.5em',
  },
});

function SignUp() {
    // local state
  const [email, setEmail] = useState('');
  const [ID, setID] = useState('');
  const [Nickname, setNickname] = useState('');

  // 인증후에 ID, 닉네임 다시 입력시 인증 다시받도록 하기위함
  useEffect(() => {setCheckId(false)}, [ID]);
  useEffect(() => {setCheckNickname(false)}, [Nickname]);

  const [confirmNumber, setConfirmNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [checkId, setCheckId] = useState(false)
  const [checkNickname, setCheckNickname] = useState(false)

  const classes = useStyles();
  // const dispatch = useDispatch();
// useState는 리액트 Hook의 하나이며, 상태 관리의 역할을 한다.
// useState는 항상 2개의 value를 return한다. 첫번째 value는 state이고, 두번째 value는 modifier이다.
// 생성한 action을 useDispatch를 통해 발생시킬 수 있다
// ex. <button onClick={()=>dispatch({type:액션타입})}>
  const navigate = useNavigate();

  // setState when user change input
  function handleID(event) {
    const { value } = event.target;
    if (value.length < 11) {
      setID(value);
      return true;
    }
    return false;
  }

  function handleNickname(event) {
    const { value } = event.target;
    if (value.length < 11) {
      setNickname(value);
      return true;
    }
    return false;
  }
  // 닉네임 최대 10글자

  const signup = ( // 액션 이름을 정의해 주도록 합니다.
    async (userInfo) => {
      // 비동기 호출 함수를 정의합니다.
      console.log(userInfo);
      await axios
        .post("/members/signup", userInfo)
        .then((res) => {
          console.log(res)
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    }
  );
  
  // submit when user click button
  function handleSubmit(event) {
    event.preventDefault();
    if (checkId && checkNickname) {
      const data = {
        'email': email,
        'id': ID,
        'name': Nickname,
        'password': password
      }
      signup(data);
      alert('요청보냄')
      navigate("/login")
    } else if (!checkId && checkNickname) {
      alert('아이디 중복을 확인해주세요')
    } else if (checkId && !checkNickname) {
      alert('닉네임 중복을 확인해주세요')
    } else if (!checkId && !checkNickname) {
      alert('아이디와 닉네임의 중복을 확인해주세요')
    }
  }
  // event.preventDefault() = 기본 클릭 동작 방지하기
  // '/signup' -> 비동기 호출 실시

  async function handleIDCheck() {
    await axios
      .get(`/members/check/id?id=${ID}`)
      .then((res) => {
        console.log(res)
        alert("사용 가능한 아이디입니다")
        setCheckId(true)
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        alert("이미 존재하는 아이디입니다")
        setCheckId(false)
        return err;
      });
  }

  

  async function handleNicknameCheck() {
    await axios
      .get(`/members/check/name?name=${Nickname}`)
      .then((res) => {
        console.log(res)
        alert("사용 가능한 닉네임입니다")
        setCheckNickname(true)
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        alert("이미 존재하는 닉네임입니다")
        setCheckNickname(false)
        return err;
      });
  }

  // validation (same password)
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
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
    ValidatorForm.addValidationRule('maxNumber', (value) => {
      if (value.length > 10) {
        return false;
      }
      return true;
    });
  }, [ID, Nickname]);

  //잘 모르겠다.
  //없어도 잘 돌아가긴 함.
  return (

    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">WISH </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  {/* 아이디 */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">아이디 <span className="text-red-600">*</span></label>
                      <input id="name" type="text" onChange={handleID} value={ID} className="form-input w-full text-gray-800" placeholder="아이디 10자 이내로 입력" required />
                      <button onClick={handleIDCheck}>중복확인</button>
                    </div>
                  </div>
                  {/* 닉네임 */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">닉네임 <span className="text-red-600">*</span></label>
                      <input id="name" type="text" onChange={handleNickname} value={Nickname} className="form-input w-full text-gray-800" placeholder="Enter your name" required />
                      <button onClick={handleNicknameCheck}>중복확인</button>
                    </div>  
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">이메일 <span className="text-red-600">*</span></label>
                      <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">

                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign up</button>
                    </div>

                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
                                </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Already using Simple? <Link to="/login" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default SignUp;