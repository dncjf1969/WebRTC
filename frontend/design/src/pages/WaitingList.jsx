import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Button from "@mui/material/Button";
// Gri
import { useNavigate, useParams } from "react-router-dom";
import "./WaitingList.css";
// // 방만들기 dialog

import axios from "../common/http-common";
import WaitingListCard from "./WaitingListCard";

export function WaitingListSearch() {
  const [rooms, setRooms] = useState([]);
  const [word, setWord] = useState(""); // submit시에 바뀔 변수
  const [search, setSearch] = useState(-1);
  // const [] state의 기본값 -1

  let { roomType } = useParams();
  roomType = parseInt(roomType);
  console.log(roomType);

  // 검색버튼 누를때 keyword바꾸고 요청
  const getRooms = async () => {
    await axios
      .get(`/room/waiting/${roomType}`, {
        params: {
          keyword: word,
          searchType: search,
          roomType: roomType,
        },
      })
      .then((res) => {
        console.log(res)
        setRooms(res.data.list);
      })
      .then(() => {
        // 검색결과 확인을 위한 콘솔창
        console.log("룸 검색 결과", rooms);
      })
      .catch((err) => {
        return err;
      });
  };
  // 맨 처음에는 -1로 해서 전체 반환
  // 이름으로 검색하면 searchType 1로 전달
  // 아이디로 검색하면 searchType 0로 전달
  // 버튼 만들어서 컨트롤

  // 처음 목록 들어갔을 때, 모든 리스트 보여주기
  useEffect(() => {
    getRooms();
  }, []);

  const onChange = (e) => {
    setWord(e.target.value);
    console.log(word);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (word === "") {
      return;
    }
    console.log(word);

    getRooms();
    setWord("");
  };
  const onClick = (e) => {
    // console.log(e.target.textContent);
    if (e.target.textContext === "방ID") {
      setSearch(0);
    } else {
      setSearch(1);
    }
  };
  return (
    <>
      <section className="relative">
        {/* Illustration behind hero content */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="1078"
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

        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header mb-5 />
          <div
            className="relative max-w-6xl mx-auto px-4 sm:px-6 "
            data-aos="zoom-y-out"
          >
            <div className="py-12 md:py-10">
              {/* Section header */}
              <div
                className="max-w-3xl py-20 mx-auto text-center pb-12 md:pb-20 font-extrabold leading-tighter text-5xl tracking-tighter"
                data-aos="zoom-y-out"
              >
                {/* 방제목 */}
                <h1 className="bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-blue-500 to-teal-200">
                  {roomType === 0 ? "인성면접 스터디" : "직무면접 스터디"}
                </h1>
                {/* 검색창 */}
                <Paper
                  onSubmit={handleSubmit}
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 800,
                  }}
                >
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={onClick}
                  >
                    방ID
                  </IconButton>
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={onClick}
                  >
                    제목
                  </IconButton>

                  <InputBase
                    onChange={onChange}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="면접 방 검색하기"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={word}
                  />
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                {/* 방 목록 카드*/}
                <div>
                  {rooms.map((room) => (
                    <WaitingListCard
                      key={room.roomId}
                      room={room}
                    />
                  ))}
                  {rooms.map(function (room, idx) {
                    return <li key={idx}>{room.name}</li>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WaitingListSearch;
