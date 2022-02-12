// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../common/http-common";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
import Line from "./chart/piechart";
import InterviewList from "./interviewList";

// 전체 컨테이너
const Wrapper = styled(Container)`
  display: flex;
  padding: 100px 0px 0px 0px;
  height: auto;
  marginTop:"3%",
  marginLeft:"3%",
  marginRight:"3%",
`;

// 메인
const Main = styled.main`
  width: 70%;
`;

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
  const ID = window.localStorage.getItem("ID");

  // 유저 정보
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

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
      const response = await axios.get(`/members/me?id=${userInfo1}`);

      setId(response.data.userId);
      setNickname(response.data.name);
      setEmail(response.data.email);
      // return response;
      console.log(response)
      console.log('myInfo: 1111111111111111111111111')
    } catch (err) {
      return err.response;
    }
  }

  //방 정보
  async function roomInfo(userInfo2) {
    try {
      const response = await axios.get(`/feedback/count?memberId=${userInfo2}`);
      setPersonality(
        response.data.filter((info) => info.type === "인성")[0].count
      );
      setJob(response.data.filter((info) => info.type === "직무")[0].count);
      setDebate(response.data.filter((info) => info.type === "토론")[0].count);
      setPT(response.data.filter((info) => info.type === "PT")[0].count);
      // return response;
      console.log(response)
      console.log('roomInfo: 22222222222222222222222222')
    } catch (err) {
      return err.response;
    }
  }

  // 피드백 정보
  async function feedback(userInfo3) {
    try {
      const response = await axios.get(`/feedback?memberId=${userInfo3}`);
      setMeetingInfo(response.data);
      setMeetingInfo2(response.data);
      // return response;
      console.log(meetingInfo);
      console.log(response.data)
      console.log('feedback: 3333333333333333333333333333')
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
      <Wrapper>
        <Message>오늘도 즐거운 면접 연습!!!!!!😀</Message>
        <main>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 5">
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 4">
                  <img src="https://placeimg.com/150/230/animals/sepia" />
                </Box>
                <Box gridColumn="span 8">
                  <Title>닉네임</Title>
                  <ContentContainer>
                    <h4>{nickname}</h4>
                    <Link to="/checkpassword">
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
                  <Email>
                    <Title>이메일: </Title>
                    <div>
                      <h4>{email}</h4>
                    </div>
                  </Email>
                </Box>
              </Box>
            </Box>

            <Box gridColumn="span 7">
              <Record>
                <Title getMoreMB>내 기록</Title>
                <MyTable
                  Personality={Personality}
                  Job={Job}
                  Debate={Debate}
                  PT={PT}
                />
              </Record>
            </Box>

            <Box gridColumn="span 8">
              <Title>그래프</Title>

              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
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

            <Box gridColumn="span 4">
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
        </main>
      </Wrapper>
    </>
  );
}
