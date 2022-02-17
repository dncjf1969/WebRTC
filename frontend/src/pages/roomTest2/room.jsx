import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestComponent from "./TestComponent";
import axios from "../../common/http-common";
import background from "../../images/background.jpg";

export default function Room() {
  const roomId = window.localStorage.getItem("roomId");
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: 0,
        marginBottom: 0,
        height: "1000px",
      }}
    >
      <TestComponent navigate={navigate} roomId={roomId} />
    </div>
  );
}
