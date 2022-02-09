import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { Link, useNavigate } from 'react-router-dom';
import { getToken, deleteToken } from '../common/JWT-common';
>>>>>>> jang

function Header() {

  const [top, setTop] = useState(true);
<<<<<<< HEAD

=======
  const jwtToken = getToken()
  const navigate = useNavigate()
>>>>>>> jang
  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

<<<<<<< HEAD
  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
=======
  function handleLogout() {
    deleteToken()
    navigate('/')
  }

  return (
    <header style={{fontFamily: 'Noto Sans CJK KR'}} className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div  className="max-w-6xl mx-auto px-5 sm:px-6">
>>>>>>> jang
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
<<<<<<< HEAD
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
=======
            <Link to="/" className="h3 block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400" aria-label="Cruip">
              {/* <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
>>>>>>> jang
                <defs>
                  <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
<<<<<<< HEAD
              </svg>
=======
              </svg> */}
              WISH
>>>>>>> jang
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
<<<<<<< HEAD
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                  <span>Sign up</span>
=======
            <ul  className="flex flex-grow justify-end flex-wrap items-center">
              {jwtToken ? 
              <li>
                <button  onClick={handleLogout} className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">로그아웃</button>
              </li>
              :
              <li>
                <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">로그인</Link>
              </li>
              }
              
              {jwtToken ? 
              <Link to="#" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">마이페이지</Link>
              :
              <li>
                <Link to="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                  <span >회원가입</span>
>>>>>>> jang
                  <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>                  
                </Link>
              </li>
<<<<<<< HEAD
=======
              
              }
              
>>>>>>> jang
            </ul>

          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
