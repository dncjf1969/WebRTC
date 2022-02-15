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

// 전체 컨테이너
const Wrapper = styled.div`
  border: 5px solid teal;
  border-radius: 2em;
`;

// 중간 컨테이너
const Style = styled.div`
  border-bottom: 5px solid rgba(251, 209, 75, 0.5);
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
  font-size: 1.5rem;
  border-bottom: 5px solid rgba(251, 209, 75, 0.5);
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
  async function myInfo(userInfo1) {
    try {
      const jwtToken11 = window.localStorage.getItem("jwt");
      const response = await axios.get('/members/me',
      {
        headers:{
          "Authorization" : jwtToken11,
        }
      }
      );

      let charURL = "https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/src/images/";

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
      const response = await axios.get(`/feedback/count`,
      {
        headers:{
          "Authorization" : jwtToken11,
        }
      }
      );

      setPersonality(
        response.data.filter((info) => info.type === "인성")[0].count
      );
      setJob(response.data.filter((info) => info.type === "직무")[0].count);
      setDebate(response.data.filter((info) => info.type === "토론")[0].count);
      setPT(response.data.filter((info) => info.type === "PT")[0].count);
      // return response;
      console.log(response);
      console.log("roomInfo: 22222222222222222222222222");
    } catch (err) {
      return err.response;
    }
  }

  // 피드백 정보
  async function feedback(userInfo3) {
    try {
      const jwtToken11 = window.localStorage.getItem("jwt");
      const response = await axios.get(`/feedback`,
      {
        headers:{
          "Authorization" : jwtToken11,
        }
      }
      );
      setMeetingInfo(response.data);
      setMeetingInfo2(response.data);
      // return response;
      console.log(meetingInfo);
      console.log(response.data);
      console.log("feedback: 3333333333333333333333333333");
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
    <div>
      {/*  Site header */}
      <Header />
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Page content */}
        <main className="flex-grow">
          {/*  Page sections */}
          <HeroMypage />

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Wrapper>
              <Box
                style={Style2}
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
              >
                <Box gridColumn="span 5">
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={2}
                  >
                    <Box gridColumn="span 4">
                      <img src={characterURL}></img>
                      {/* <img src="https://placeimg.com/150/230/animals/sepia" /> */}
                      {/* <Gravatar email={email} size={300} rating="pg" default="monsterid" style={{margin: '5px'}}className="CustomAvatar-image" /> */}
                    </Box>
                    <Box gridColumn="span 8">
                      <Title>닉네임</Title>
                      <ContentContainer>
                        <h3>{nickname}</h3>
                        {/* 회원정보수정 버튼은 있지만, 회원정보수정 기능이 실행되지는 않음 */}
                        <Link to="/updateuser">
                          <CommonButton
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<EditIcon />}
                          >
                            회원정보수정
                          </CommonButton>
                        </Link>
                      </ContentContainer>
                      <br />
                      <Email>
                        <Title>이메일: </Title>
                        <div>
                          <h3>{email}</h3>
                        </div>
                      </Email>
                    </Box>
                  </Box>
                </Box>

                <Box gridColumn="span 7">
                  <Record>
                    <Title>내 기록</Title>
                    <MyTable
                      Personality={Personality}
                      Job={Job}
                      Debate={Debate}
                      PT={PT}
                    />
                  </Record>
                </Box>

                <Box gridColumn="span 9">
                  <Title>그래프</Title>

                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={2}
                  >
                    <Box gridColumn="span 6">
                      <Bar
                        Personality={Personality}
                        Job={Job}
                        Debate={Debate}
                        PT={PT}
                      />
                    </Box>
                    <Box gridColumn="span 6">
                      <Donut
                        Personality={Personality}
                        Job={Job}
                        Debate={Debate}
                        PT={PT}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box gridColumn="span 3">
                  <Title>면접 피드백 (방제목)</Title>
                  <InterviewList
                    MeetingInfo={meetingInfo}
                    MeetingInfo2={meetingInfo2}
                  />
                </Box>
              </Box>
              <Footer>
                <DeleteModal nickname={nickname} />
              </Footer>
            </Wrapper>
          </div>
        </main>
        <br />
      </div>
    </div>
  );
}
