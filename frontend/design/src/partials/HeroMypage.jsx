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

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-10">
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
