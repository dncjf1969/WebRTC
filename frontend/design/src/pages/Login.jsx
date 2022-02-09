import { Link } from 'react-router-dom';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import axios from '../common/http-common';
import { saveToken } from '../common/JWT-common'
import { useNavigate } from "react-router-dom";
import Header from '../partials/Header';


function Login() {

   // state
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  //navigate
  const navigate = useNavigate()

  // function
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      'id': ID,
      'password': password,
    };
    login(data); // LoginSlice에서 가져온 로그인 액션, login(data) 는 createAsyncThunk로 만든것.
  }
  async function login (userInfo) {
    try {
      const response = await axios.post('/members/login', userInfo)
      const {
        data: {accessToken},
      } = response;
      saveToken(accessToken);
      console.log(response)
      navigate('/')
      return response;
    } catch (err) {
      return(err.response)
    }
  };
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
<<<<<<< HEAD
                <h1 className="h1">로그인해라 존말로할때</h1>
=======
                <h1 className="h1">로그인</h1>
>>>>>>> jang
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="ID">아이디</label>
                      <input id="ID" type="text" onChange={(e) => setID(e.target.value)} value={ID} autoFocus className="form-input w-full text-gray-800" placeholder="아이디를 입력해주세요." required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">비밀번호</label>
                        <Link to="reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble Loging in?</Link>
                      </div>
                      <input id="password" type="password" className="form-input w-full text-gray-800" onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
            value={password} placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">이거뭐지</span>
                        </label>
                      </div>
                    </div>
                  </div>
=======
            value={password} placeholder="비밀번호를 입력해주세요." required />
                    </div>
                  </div>
                  
>>>>>>> jang
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" >로그인</button>
                    </div>
                  </div>
                </form>
<<<<<<< HEAD
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
                  Don’t you have an account? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
=======
              
                <div className="text-gray-600 text-center mt-6">
                  WISH 회원이 아니신가요? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">지금 가입하세요</Link>
>>>>>>> jang
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default Login;