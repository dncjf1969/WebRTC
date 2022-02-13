import React, { useState } from "react";
import Modal from "../utils/Modal";

import HeroImage from "../images/메인2.svg";
import { Button } from "@mui/material";
import WaitingRoomModal from "./WaitingRoomModal";

function HeroHome() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-10">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xs font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              오늘도 즐거운
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-200">
              {" "}면접{" "}
              </span>
              연습!!!!!!😀
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
