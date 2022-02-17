import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="text-xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-blue-500 to-green-100">
              {/* Logo */}
              <p className="inline-block" aria-label="Cruip">
                WISH
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <span className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">SSAFY 6th E201</span>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Members</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">이우철</p>
              </li>
              <li className="mb-2">
                <parent className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">이정현</parent>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">장영남</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">조현아</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">최소희</p>
              </li>                            
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Technologies Used</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">React.js</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">CRA</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">MUI</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">styled component</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Tailwind</p>
              </li>  
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">AOS</p>
              </li>  
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">　</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Spring</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">teachable machine</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Spring security</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">JPA</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">mysql</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">redis</p>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">　</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">jenkins</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">docker</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">nginx</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">amazon EC2</p>
              </li>
            </ul>
          </div>         
        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">Made by <span className="text-blue-600 hover:underline">SSAFY 6th E201</span></div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
