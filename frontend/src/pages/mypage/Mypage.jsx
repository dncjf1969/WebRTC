// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../common/http-common";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";

// style
import { Container, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import Box from "@mui/material/Box";

// component
import MyTable from "./Mytable";
import DeleteModal from "./DeleteModal";
import Donut from "./chart/donutchart";
import Bar from "./chart/barchart";
import InterviewList from "./interviewList";
import Header from "../../partials/Header";
import HeroMypage from "../../partials/HeroMypage";
import { Grid } from "@mui/material";
import "./Mypage.css";

// 전체 컨테이너
const Wrapper = styled.div`
  border: x solid rgba(36, 188, 199, 0.5);
  border-radius: 1.5em;
`;

const Style2 = {
  margin: 10,
  padding: 40,
};

// 제목
const Title = styled.div`
  display: inline-box;
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

// 내용
const Content = styled.span`
  font-size: 2rem;
  display: inline-block;
`;

const CommonButton = styled(Button)`
  width: 100%;
  border-radius: 6px;
  padding: 0.4em 1em;
  background: #9fa9d8;
  color: white;

  &:hover {
    background: #8090d8;
    color: white;
  }
`;

const ContentContainer = styled.div`
  display: flex;
`;

// 이메일
const Email = styled.div``;

// 기록
const Record = styled.section``;

// 메세지
const Message = styled.p`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
`;

// footer
const Footer = styled.footer`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  margin: 50px 0;
`;

export default function MyPage() {
  const ID = window.localStorage.getItem("id");

  // 유저 정보
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [characterURL, setCharacterURL] = useState("");

  //방 정보
  const [Personality, setPersonality] = useState();
  const [Job, setJob] = useState();
  const [Debate, setDebate] = useState();
  const [PT, setPT] = useState();

  // 피드백 정보
  // const [meetingInfo, setMeetingInfo] = useState('');
  const [meetingInfo, setMeetingInfo] = useState([]);
  const [meetingInfo2, setMeetingInfo2] = useState([]);

  // 유저 정보
  async function myInfo() {
    try {
      const jwtToken11 = window.localStorage.getItem("jwt");
      const response = await axios.get("/members/me", {
        headers: {
          Authorization: jwtToken11,
        },
      });

      let charURL =
        "/src/images/";

      setCharacterURL(charURL + response.data.characterNum + ".PNG");
      console.log(response.data.characterNum);

      setId(response.data.userId);
      setNickname(response.data.name);
      setEmail(response.data.email);
      // return response;
      console.log(response);
      console.log("myInfo: 1111111111111111111111111");
    } catch (err) {
      return err.response;
    }
  }

  //방 정보
  async function roomInfo(userInfo2) {
    try {
      const jwtToken11 = window.localStorage.getItem("jwt");
      const response = await axios.get(`/feedback/count`, {
        headers: {
          Authorization: jwtToken11,
        },
      });

      setPersonality(
        response.data.filter((info) => info.type === "인성")[0].count
      );
      setJob(response.data.filter((info) => info.type === "직무")[0].count);
      setDebate(response.data.filter((info) => info.type === "토론")[0].count);
      setPT(response.data.filter((info) => info.type === "PT")[0].count);
      // return response;
      console.log(response);
      console.log("roomInfo: 222222");
    } catch (err) {
      return err.response;
    }
  }

  // 피드백 정보
  async function feedback(userInfo3) {
    try {
      const jwtToken11 = window.localStorage.getItem("jwt");
      const response = await axios.get(`/feedback`, {
        headers: {
          Authorization: jwtToken11,
        },
      });
      setMeetingInfo(response.data);
      setMeetingInfo2(response.data);
      // return response;
      console.log(meetingInfo);
      console.log(response.data);
      console.log("feedback: 333333");
    } catch (err) {
      return err.response;
    }
  }

  useEffect(() => {
    myInfo(ID);
    roomInfo(ID);
    feedback(ID);
    return 0;
  }, []);

  return (
    <>
      <section className="relative">
        {/* Illustration behind hero content */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="1300"
            height="878"
            viewBox="0 30 1460 350"
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
                {/* <stop stopColor="#FFF" offset="0%" /> */}
                <stop stopColor="#e7f7fa" offset="10%" />
                {/* <stop stopColor="#DFDFDF" offset="100%" /> */}
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
          <div className="   sm:px-6 " data-aos="zoom-y-out">
            <div className="py-12 md:py-10">
              {/* Section header */}
              <div
                className="max-w-5xl py-20 mx-auto text-center pb-12 md:pb-20 font-extrabold leading-tighter text-5xl"
                data-aos="zoom-y-out"
              >
                {/* 방제목 */}
                <h1 className="bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-blue-500 to-teal-200">
                  마이페이지
                </h1>
              </div>
              {/* 마이페이지 박스 */}
              <div className="flex flex-row mx-64">
                {/* 유저정보 */}
                <div className="flex-col flex content-center justify-around flex-wrap basis-1/4 p-5 border-2 border-stone-100 rounded-lg mr-4">
                  <div className="ml-10">
                    <img
                      className="inline-block h-15 w-15 rounded-full ring-2 ring-white"
                      src={characterURL}
                      alt=""
                    />
                  </div>
                  <div className="ml-2 mt-2">닉네임 : {nickname}</div>
                  <div className="ml-2 mb-2 ">{email}</div>
                  <div className="flex flex-row ml-2">
                    <Link to="/updateuser">
                      <button className="py-2 px-2 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-75">
                        <EditIcon />
                        회원정보수정
                      </button>
                    </Link>
                  </div>
                </div>
                {/* 나의 면접 횟수 */}
                <div id="green" className=" p-3 basis-3/4 m6 rounded-lg">
                  <Record>
                    <Title>
                      <h1 id="black">역검 응시</h1>
                    </Title>
                    <MyTable
                      Personality={Personality}
                      Job={Job}
                      Debate={Debate}
                      PT={PT}
                    />
                  </Record>
                </div>
              </div>
              <div className="flex flex-row mx-64">
                {/* 그래프 */}
                <div
                  id="blue"
                  className="border-2 border-stone-100 p-5 basis-1/2 mt-5 mr-4 rounded-lg"
                >
                  {" "}
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={2}
                  >
                    <Box gridColumn="span 6" sx={{ mt: 8, ml: 3 }}>
                      <Donut
                        Personality={Personality}
                        Job={Job}
                        Debate={Debate}
                        PT={PT}
                      />
                    </Box>
                  </Box>
                </div>
                {/* 면접 피드백 조회 */}
                <div
                  id="green"
                  className=" bg-gray-100 p-5 basis-1/2 overscroll-auto overflow-scroll overflow-x-auto mt-5  rounded-lg"
                >
                  <Title>
                    <p id="black" className=" font-bold text-black">
                      나의 피드백
                    </p>
                  </Title>
                  <InterviewList
                    MeetingInfo={meetingInfo}
                    MeetingInfo2={meetingInfo2}
                  />
                </div>
              </div>
              <Footer className="mr-96 ">
                <DeleteModal nickname={nickname} />
              </Footer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
