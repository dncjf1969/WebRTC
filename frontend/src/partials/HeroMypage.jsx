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
        <div className="pt-40 pb-12 md:pt-40 md:pb-10">
          {/* <div className="text-center pb-12 md:pb-12"> */}
          <h1 className="bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-blue-500 to-teal-200">
            마이 페이지
          </h1>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
