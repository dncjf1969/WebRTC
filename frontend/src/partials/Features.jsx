import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
// import Work from './card/Kind';
import debate from "../images/토론.svg";
import normal from "../images/인성.svg";
import job from "../images/직무.svg";
import pt from "../images/피티.svg";
// import FeaturesElement from '../images/features-element.png';
// import Kind from './card/Kind';
import { Link, useParams } from "react-router-dom";
function Features() {
  const [tab, setTab] = useState(1);
  const tabs = useRef(null);

  const heightFix = () => {
    if (tabs.current.children[tab]) {
      tabs.current.style.height =
        tabs.current.children[tab - 1].offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 "
        aria-hidden="true"
        data-aos="zoom-y-out"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h2 mb-4  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-200">
              Get Study With Us
            </h1>
            <p className="text-xl text-gray-600 font-bold">
              희망하는 면접스터디 유형을 선택해주세요🤓
            </p>
          </div>
          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition border-2 border-gray-200 rounded bg-white duration-300 ease-in-out mb-3 hover:scale-105 transition duration-500 shadow-lg  ${
                    tab !== 1
                      ? "bg-white shadow-md border-gray-300 hover:shadow-lg"
                      : "bg-gradient-to-r from-blue-200 to-teal-100 pointer"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      인성면접
                    </div>
                    <div className="text-gray-500">
                      인성면접 스터디하러 가볼까요?
                    </div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border border-2 border-gray-200 rounded bg-white transition duration-300 ease-in-out mb-3 hover:scale-105 transition duration-500 shadow-lg ${
                    tab !== 2
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gradient-to-r from-blue-200 to-teal-100 pointer"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      직무면접
                    </div>
                    <div className="text-gray-600">
                      직무면접 스터디하러 가볼까요?
                    </div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border border-2 border-gray-200 rounded bg-white transition duration-300 ease-in-out mb-3 hover:scale-105 transition duration-500 shadow-lg ${
                    tab !== 3
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gradient-to-r from-blue-200 to-teal-100 pointer"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      pt면접
                    </div>
                    <div className="text-gray-600">
                      pt면접 스터디하러 가볼까요?
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition border-2 border-gray-200 rounded bg-white duration-300 ease-in-out mb-3 hover:scale-105 transition duration-500 shadow-lg ${
                    tab !== 4
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gradient-to-r from-blue-200 to-teal-100 pointer"
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(4);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      토론면접
                    </div>
                    <div className="text-gray-600">
                      토론면접 스터디하러 가볼까요?
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z"
                        fill="#191919"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
              data-aos="zoom-y-out"
              ref={tabs}
            >
              <div className="relative flex flex-col text-center lg:text-right">
                {/* Item 1 */}
                <Transition
                  show={tab === 1}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <Link to={`/waitinglist/0`}>
                    <div className="relative inline-flex flex-col">
                      <img
                        className="md:max-w-none mx-auto rounded mt-10 "
                        src={normal}
                        width="390"
                        height="462"
                        alt="Features bg"
                      />
                      {/* <img className="md:max-w-none mx-auto rounded" src={FeaturesBg} width="390" height="462" alt="Features bg" /> */}
                    </div>
                  </Link>
                </Transition>
                {/* Item 2 */}
                <Transition
                  show={tab === 2}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <Link to="/waitinglist/1">
                    <div className="relative inline-flex flex-col">
                      <img
                        className="md:max-w-none mx-auto rounded mt-10"
                        src={job}
                        width="390"
                        height="462"
                        alt="Features bg"
                      />
                      {/* <img className="md:max-w-none absolute w-full left-0 transform animate-float" src={FeaturesElement} width="390" height="44" alt="Element" style={{ top: '30%' }} /> */}
                    </div>
                  </Link>
                </Transition>
                {/* Item 3 */}
                <Transition
                  show={tab === 3}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="md:max-w-none mx-auto rounded mt-10"
                      src={pt}
                      width="390"
                      height="462"
                      alt="Features bg"
                    />
                    {/* <img className="md:max-w-none absolute w-full left-0 transform animate-float" src={FeaturesElement} width="390" height="44" alt="Element" style={{ top: '30%' }} /> */}
                  </div>
                </Transition>
                <Transition
                  show={tab === 4}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img
                      className="md:max-w-none mx-auto rounded mt-10 cursor-not-allowed"
                      src={debate}
                      width="390"
                      height="462"
                      alt="Features bg"
                    />
                    {/* <img className="md:max-w-none absolute w-full left-0 transform animate-float" src={FeaturesElement} width="390" height="44" alt="Element" style={{ top: '30%' }} /> */}
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
