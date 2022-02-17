import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import { FaCheckCircle } from "react-icons/fa";
// import Work from './card/Kind';

import normal from "../images/인성.svg";
import job from "../images/직무.svg";

// import FeaturesElement from '../images/features-element.png';
// import Kind from './card/Kind';
import { Link, useParams } from "react-router-dom";
import "./Features.css";
function Features() {
  return (
    <section className="relative " data-aos="zoom-y-out" data-aos-delay="150">
      {/* Section background (needs .relative class on parent and next sibling elements) */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <span className="bg-clip-text font-extrabold mb-8 text-transparent bg-gradient-to-r from-blue-500 to-teal-200 text-4xl">
              Get study with us
            </span>
            <p className="text-xl text-gray-600 mt-4 font-bold">
              희망하는 면접스터디 유형을 선택해주세요🧐
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <Link to="/waitinglist/0">
              <div
                id="card1"
                className="relative h-96 w-80 ml-44 flex flex-col  p-6   rounded shadow-xl  rounded bg-white hover:scale-110 transition duration-500 hover:border-white  shadow-lg"
              >
                <img
                  className="w-40 h-40 p-1 ml-14 mt-7 mb-2"
                  src={normal}
                  width="390"
                  height="462"
                  alt="Features bg"
                />

                <h3
                  id="title"
                  className="text-xl font-bold ml-24 leading-snug tracking-tight mb-2 bor"
                >
                  인성면접
                </h3>
                <h5 className=" mt-2 text-left font-medium">CHECK POINT</h5>
                <p className="py-1 text-left font-light ">
                  <FaCheckCircle className="inline mb-1 mr-2" />
                  <span id="line1">자기소개</span> 꼬리질문까지!
                </p>
                <p className="pb text-left font-light ">
                  <FaCheckCircle className="inline mb-1 mr-2" />
                  갑질 면접관이 되고 싶다면? 😁
                </p>
              </div>
            </Link>
            {/* 2nd item */}
            <Link to="/waitinglist/1">
              <div
                id="card2"
                className="relative h-96 w-80 ml-8 flex flex-col  p-6 bg-white rounded shadow-xl  border-gray-200 rounded bg-white hover:scale-110 hover:border-white transition duration-500 shadow-lg"
              >
                <img
                  className="w-40 h-40 p-1  ml-14 mt-12 mb-2"
                  src={job}
                  width="390"
                  height="462"
                  alt="Features bg"
                />
                <h3
                  id="title"
                  className="text-xl font-bold  ml-24 leading-snug tracking-tight mb-1 bor"
                >
                  직무면접
                </h3>
                <h5 className="mt-4 text-left font-medium">CHECK POINT</h5>

                <p className="py-1 summary text-left font-light">
                  <FaCheckCircle className="inline mb-1 mr-2" />
                  <span id="line2">직무 기초</span>부터 응용까지 !
                </p>
                <p className=" text-left font-light">
                  <FaCheckCircle className="inline mb-1 mr-2" />
                  내가 CS 좀 친다 하면 여기로 🤥
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
