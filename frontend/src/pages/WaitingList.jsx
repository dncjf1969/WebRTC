import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// Gri
import { Link, useNavigate, useParams } from "react-router-dom";
import "./WaitingList.css";
// // 방만들기 dialog

import axios from "../common/http-common";
import WaitingListCard from "./WaitingListCard";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import styled, { keyframes } from "styled-components";

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
        },
        headers: {
          Authorization: window.localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res);
        setRooms(res.data.list);
      })
      .then(() => {
        // 검색결과 확인을 위한 콘솔창
        console.log("룸 검색 결과", rooms);
        console.log("id검색 결과", search);
      })
      .catch((err) => {
        console.log(err.response);
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
  // select 태그로 바꿔서 보내기
  const onClickSelect = (e) => {
    setSearch(e.target.value);
    console.log(search);
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
            width="1260"
            height="878"
            viewBox="0 10 1360 13"
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
                  {roomType === 0 ? "인성면접 스터디" : "직무면접 스터디"}
                </h1>
                {/* 검색창 */}
                <Paper
                  onSubmit={handleSubmit}
                  component="form"
                  sx={{
                    p: "2px 4px",
                    width: "80%",
                    marginTop: "3%",
                    marginLeft: "10%",
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    // width: 800,
                  }}
                >
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    onChange={onClickSelect}
                    value={search}
                    className="mt-1 block text-gray-600 w-32 py-2 px-3 border cursor-pointer bg-white focus:outline-none focus:ring-indigo-500 border-none sm:text-sm"
                  >
                    <option value={-1}>통합검색</option>
                    <option value={0}>방ID</option>
                    <option value={1}>방제목</option>
                  </select>

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
                <Container>
                  <ProductList>
                    <Grid
                      container
                      margin={0}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      {rooms.map((room, idx) => (
                        // <li key={idx}>{d.groupNo}</li>
                        <Grid
                          item
                          key={idx}
                          sx={{ marginLeft: 2, marginRight: 2 }}
                        >
                          <Alarm>
                            <Box>New</Box>
                          </Alarm>
                          <CardActionArea>
                            <Card
                              sx={{
                                width: 200,
                                height: 200,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "whitesmoke",
                                transition: "all .25s linear",
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="auto"
                                width="100px"
                                image="img/Hoodie.png"
                                alt="Product Image"
                              />
                            </Card>
                          </CardActionArea>
                          <CardDetail>
                            <CategoryName>{room.name}</CategoryName>
                            <ProductName>{room.job}</ProductName>
                            <ProductName>{room.manager}</ProductName>
                            {/* <Price>{makeComma(d.price)}원</Price> */}
                            <PriceDetail>
                              {" "}
                              {room.memberCount} / {room.memberMax}
                            </PriceDetail>
                            {/* <MaxPeople>80/{d.maxPeople}명</MaxPeople>
                <DeadLine>마감 {d.deadline}일 전</DeadLine> */}
                          </CardDetail>
                        </Grid>
                      ))}
                    </Grid>
                  </ProductList>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
const CardImg = styled(CardMedia)``;

const animation = keyframes`
0% {
  opacity: 1;
}
10% {
  opacity: 0.9;
}
20% {
  opacity: 0.8;
}
30% {
  opacity: 0.7;
}
40% {
  opacity: 0.6;
}
50% {
  opacity: 0.5;
}
60% {
  opacity: 0.4;
}
70% {
  opacity: 0.3;
}
80% {
  opacity: 0.2;
}
90% {
  opacity: 0.1;
}
100% {
  opacity: 0;
}
`;

const Box = styled.div`
  height: 20px;
  width: 50px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  animation: ${animation} 3s infinite;
  margin-bottom: 5px;
  margin-top: 10px;
`;

const Alarm = styled.span`
  display: flex;
  justify-content: left;
  font-size: 10px;
  font-weight: bold;
  color: white;
`;

const TextKOR = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: grey;
  text-align: center;
  margin-top: 3px;
`;

const TextENG = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  margin-top: 20px;
`;

const MaxPeople = styled.p``;

const DeadLine = styled.p``;

const PriceDetail = styled.p`
  font-size: 8px;
  color: grey;
`;

const ProductName = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding-bottom: 3px;
`;

const CategoryName = styled.p`
  font-size: 10px;
  font-weight: bold;
  color: grey;
  padding-bottom: 5px;
`;

const CardDetail = styled.div`
  justify-content: left;
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
  /* height: 100vh; */
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-flow: wrap;
  row-gap: 20px;
  margin-bottom: 50px;
`;

const ProductList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export default WaitingListSearch;
