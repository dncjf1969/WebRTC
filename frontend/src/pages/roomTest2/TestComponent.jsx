import React, { Component } from "react";
import axios from "axios";
import myAxios from "../../common/http-common";
import background from "../../images/background.jpg";
//

import logoImage from "../../images/logo.PNG";


import "./TestComponent.css";
import { OpenVidu } from "openvidu-browser";
import StreamComponent from "./stream/StreamComponent";
import StreamComponent2 from "./stream/StreamComponent2";
import StreamComponent3 from "./stream/StreamComponent3"

import StreamComponent2Test from "./stream/StreamComponent2Test";
// import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import ChatComponent from "./chat/ChatComponent";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
// import styled from "styled-components";
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';

import TestUserList from "./TestUserList/TestUserList";
import TestQuesList from "./TestQuesList/TestQuesList";
import EvaluationSheet from "./evaluationSheet/evaluationSheet";
import RecommendationQues from "./recommendationQues/recommendationQues";

// material
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
} from "@mui/material";
// 피드백용
import PropTypes from "prop-types";
import { Button } from '@material-ui/core';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from "@mui/material/Divider";
//
import { blue } from "@material-ui/core/colors";
// character
import Character0 from "../../images/00.png"
import Character1 from "../../images/01.png"
import Character2 from "../../images/02.png"
import Character3 from "../../images/03.png"
import Character4 from "../../images/04.png"
import Character5 from "../../images/05.png"
// ----------------------------------------------------------------------



//// 피드백용
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
};
////

let localUser = new UserModel();

class TestComponent extends Component {
  constructor(props) {
    super(props);
    // this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
    //   ? this.props.openviduServerUrl
    //   : "https://" + "i6e201.p.ssafy.io" + ":4443";
    this.OPENVIDU_SERVER_URL = "https://i6e201.p.ssafy.io:1443";
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "WISH";
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    // let sessionName = this.props.sessionName
    //   ? this.props.sessionName
    //   : "SessionA";
    let sessionName = this.props.roomId;
    let waitingId = this.props.roomId;
    let userName = this.props.nickname
      ? this.props.nickname
      : "OpenVidu_User" + Math.floor(Math.random() * 100);
    let id = this.props.id ? this.props.id : "임시아이디";
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      roomname: "",
      memberMax: 0,
      job: "",
      type: "",
      exitPassword: false,
      characterNum: "",
      id: "",
      // 방id like key
      mySessionId: sessionName,
      // 방에 들어간 유저 - > nickname
      myUserName: userName,
      // session은 내가 있는 그 session 자체
      session: undefined,
      // 메인 카메라 화면사람 지정
      mainStreamManager: undefined,
      // 나
      publisher: undefined,
      // 나를 제외한 유저들
      subscribers: [],
      started: false,
      readyState: false,
      viewerState: undefined,
      // gametype: 인성,직무 면접
      gametype: "pushUp",
      // 우리한테 필요없음
      status: "up",
      // TM에 필요했던거
      check: false,
      // 카운트세는거 필요ㄴㄴ
      count: 0,
      // TM에 필요했던거
      webcam: undefined,
      // TM에 필요했던거
      model: undefined,
      // TM에 필요했던거
      URL: undefined,
      // [닉네임, 갯수] 배열
      ranking: new Map(),
      // 랭킹정하는 배열
      sortedrank: new Map(),
      // 최종 등수를 인덱스 순으로 정렬된 데이터
      rankdata: undefined,
      messages: [],
      chaton: false,
      message: "",
      // 방장 (정의하는 기준 )
      ishost: false,
      hostId: undefined,
      // 토론, pt 한다면 추가
      timer: false,
      // 높은 확률로 jwt토큰인데 여기서 사용안했음
      token: undefined,
      audiostate: false,
      videostate: true,
      // 방제목 결정
      headerText: "",
      //
      arrow: false,
      leaved: false,
      isRankModalOpen: false,
      startbuttonstate: true,
      finalRank: [],
      isFliped: true,
      localUser: undefined,
      chatDisplay: "block",
      currentVideoDevice: undefined,
      nowUser: [],
      customSubscriber: [],
      latestUser: undefined,
      questions: [],
      recoQues: [],
      isStart: false,
      allReady: false,
      allUsers: [],
      viewers: [],
      viewees: [],
      // 면접관이 질문당 평가하고 이벤트 보낼때 몇명이 평가했는지 보기위해
      evalnum: 0,
      // 다른 면접관이 모두 평가하길 기다리는 상태
      evalWaiting: false,
      // 면접관이 평가완료 누를때마다 다음 면접자로 넘어가기위해 설정한 면접자idx
      vieweeIdx: 0,
      chosenQues: "",
      // 나중에 API로 수정
      waitingId: waitingId,
      meetingId: "",
      preQuesId: -1,
      curQuesId: -1,
      destroyedUserId: "",
      // 사전질문이랑 채팅 토글
      value: 0,
      hidden: false,
      customQuesCheck: false,
      feedbacks: [],
      feedbackDialogState: false,
      managerLayoutState: 1,
    };
    console.log("state다");
    console.log(this.state);
    console.log(localUser);
    this.handleExitBtn = this.handleExitBtn.bind(this);
    this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
    this.getRecoQues = this.getRecoQues.bind(this);
    this.nextViewee = this.nextViewee.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.readyStatusChanged = this.readyStatusChanged.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.updateHost = this.updateHost.bind(this);
    this.setValue = this.setValue.bind(this);
    this.handleChoiceQues = this.handleChoiceQues.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.initialize = this.initialize.bind(this);
    this.setManagerLayoutState = this.setManagerLayoutState.bind(this);
  }

  componentDidMount() {

    myAxios
      .get("/members/me", {
        headers: {
          Authorization: window.localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        let temp = ""
        switch (res.data.characterNum) {
          case 0:
            temp = Character0
            break
          case 1:
            temp = Character1
            break
          case 2:
            temp = Character2
            break
          case 3:
            temp = Character3
            break
          case 4:
            temp = Character4
            break
          case 5:
            temp = Character5
            break
          default:
            temp = ""
        }
        console.log(res);
        this.setState({
          myUserName: res.data.name,
          id: res.data.userId,
          characterNum: temp,
        });
      })
      .catch((e) => console.log(e));

    myAxios
      .get(`/room/waiting/info?roomId=${this.props.roomId}`, {
        headers: {
          Authorization: window.localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          exitPassword: res.data.exitPassword,
          memberMax: res.data.memberMax,
          roomname: res.data.name,
          type: res.data.type,
          job: res.data.job,
        });
      })
      .catch((e) => console.log(e));

    console.log("마운트됐다");
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    // 레이아웃
    this.layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );

    // 사용자가 페이지를 떠날 때 정말 떠날것인지 확인하는 대화상자 팝업
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    window.addEventListener("resize", this.checkSize);
    
    this.OV = new OpenVidu();
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    // this.OV = new OpenVidu();

    console.log("initSession 확인 ***********");
    console.log(this.OV);
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        console.log(this.state.session);
        this.connectToSession();
        console.log(this.state.session);
        console.log("나의 ishost:", this.state.ishost);

        this.state.session.on("streamCreated", (event) => {
          console.log("스트림크리에이티드");
          console.log(event);
          console.log(this.state.latestUser);
          console.log(localUser);
          this.setState({ allReady: false });
          this.state.session
            .signal({
              data: JSON.stringify({
                ready: this.state.readyState,
                questions: this.state.questions,
                viewer: this.state.viewerState,
              }),
              to: [this.state.latestUser],
              type: "new-user",
            })
            .then(() => {
              console.log("정보보냈다");
            })
            .catch((error) => {
              console.log(error);
            });
        });

        this.state.session.on("signal:new-user", (event) => {
          console.log(event);
          console.log("정보받았다");
          const from = event.from.connectionId;
          this.state.subscribers.forEach((element) => {
            if (element.connectionId === from) {
              console.log(element);
              element.setReady(JSON.parse(event.data).ready);
              element.setViewer(JSON.parse(event.data).viewer);
              this.setState({ subscribers: this.remotes });
            }
          });
          console.log("지금 내 퀘션", this.state.questions);
          const temp = JSON.parse(event.data).questions;
          console.log("들어온 퀘션", temp);
          if (this.state.questions.length === 0) {
            this.setState({ questions: temp });
          }
          console.log("다시 내 퀘션", this.state.questions);
          console.log(temp === this.state.questions);
        });

        this.state.session.on("connectionCreated", (event) => {
          console.log("!!! conectioncreated");
          console.log(event);
          this.setState({ latestUser: event.connection });
          console.log(this.state.latestUser);
          // const temp = JSON.parse(event.target.options.metadata)
          // console.log(temp.clientData)
          console.log(event.target.remoteConnections);
          // event-connection-data는 me
          // event-target-remoteConnections는 참여자들(나 포함)
          //this.state.nowUser = event.target.remoteConnections;
          // 참여자 전체 정보
          // const temp = event.target.remoteConnections;
          //this.state.nowUser = [];

          //temp.forEach(element => {
          const temp2 = JSON.parse(event.connection.data);
          console.log(temp2.clientData);
          // 로컬 유저에 대한 정보
          const temp3 = {
            userName: temp2.clientData,
            sessionID: event.connection.connectionId,
            ready: this.readyState,
          };
          console.log("event다", event);
          this.state.nowUser.push(temp3);
        });
        // 새유저가 들어왔을 때, 다른사람의 레디 정보가 반영 안됨
        this.state.session.on("signal:readyTest", (event) => {
          console.log(event);
          console.log(event.target.remoteConnections);
          //시그널을 보낸 세션 아이디
          let xx = event.from.connectionId;
          if (xx === localUser.connectionId) {
            this.readyStatusChanged();
            this.setState({ readyState: !this.state.readyState });
            console.log("내 레디상태", this.state.readyState);
            if (event.data === "true") {
              localUser.setViewer(true);
              this.setState({ viewerState: true });
            } else {
              localUser.setViewer(false);
              this.setState({ viewerState: false });
            }
            this.sendSignalUserChanged({ viewerState: localUser.isViewer() });
            this.setState({ localUser: localUser });
          }
          console.log(xx + "가 레디를 하겠대 or 레디 취소 하겠대.");
          console.log(this.state.subscribers);
          this.state.subscribers.forEach((element) => {
            if (element.connectionId === xx) {
              console.log(element);
              element.setReady(!element.ready);
              if (event.data === "true") {
                element.setViewer(true);
              } else {
                element.setViewer(false);
              }
              this.setState({ subscribers: this.remotes });
            }
          });
          const check = (value) => value.ready;
          // console.log('스타트')
          // console.log(this.props)
          if (this.state.subscribers.every(check) && this.state.readyState) {
            this.setState({ allReady: true });
          } else {
            this.setState({ allReady: false });
          }
        });

        this.state.session.on("signal:makeQues", (event) => {
          //시그널을 보낸 세션 아이디
          let xx = event.from.connectionId;
          console.log(xx + "가 질문 만들겠대.");
          console.log(event);
          let zz = "";
          for (let i = 0; i < this.state.nowUser.length; i++) {
            if (this.state.nowUser[i].sessionID === xx) {
              zz = this.state.nowUser[i].userName;
              break;
            }
          }
          let yy = JSON.parse(event.data);
          let fromUserNickname = JSON.parse(event.from.data).clientData;
          //
          this.setState({
            questions: [
              ...this.state.questions,
              {
                userName: fromUserNickname,
                connectionId: xx,
                content: yy.question,
                questionId: yy.questionId,
              },
            ],
          });
          console.log(this.state.questions);
        });
        this.state.session.on("signal:deleteQues", (event) => {
          console.log(event);
          const temp = this.state.questions;
          const newQuestions = temp.filter(
            (question) => question.questionId !== event.data
          );
          this.setState({ questions: newQuestions });
        });

        this.state.session.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          const destroyedUserId = JSON.parse(event.stream.connection.data).id;
          this.updateHost().then((connectionid) => {
            const host = connectionid;
            const context = JSON.stringify({
              hostId: host,
              destroyedUserId: destroyedUserId,
            });
            this.state.session
              .signal({
                data: context,
                to: [],
                type: "update-host",
              })
              .then(() => {})
              .catch((error) => {});
          });
          this.deleteSubscriber(event.stream.streamManager);
        });

        // 방장 업데이트
        this.state.session.on("signal:update-host", (event) => {
          const data = JSON.parse(event.data);
          this.setState({ hostId: data.hostId });
          this.setState({ destroyedUserId: data.destroyedUserId });
          // 방장만 요청보내
          if (this.state.session.connection.connectionId === data.hostId) {
            // 방장이 갱신되는 상황만 요청에 정보보내
            const nextManager = this.state.ishost ? "" : this.state.id;
            this.setState({ ishost: true });
            myAxios.put(
              `/room/waiting/exit?memberId=${data.destroyedUserId}&nextManger=${nextManager}&roomId=${this.state.waitingId}`,
              {
                headers: {
                  Authorization: window.localStorage.getItem("jwt"),
                },
              }
            );
          }
        });

        // 게임시작
        this.state.session.on("signal:start", async (event) => {
          console.log("원래 내 스타트상태", this.state.isStart);

          let allUsers = [localUser, ...this.state.subscribers];
          let viewees = [];
          let viewers = [];

          allUsers.forEach((element) => {
            if (element.viewer) {
              viewers.push(element);
            } else if (!element.viewer) {
              viewees.push(element);
            }
          });
          // 모든로컬에서 면접자들 똑같은순서로 진행되도록
          viewees.sort((a, b) => (a.connectionId < b.connectionId ? -1 : 1));
          // 면접자가 자기차례면 마이크 켜
          this.getRecoQues();
          this.setState({
            isStart: true,
            allUsers: allUsers,
            viewees: viewees,
            viewers: viewers,
            meetingId: event.data,
            mainStreamManager: viewees[0],
          });
          console.log("시그널받고 스타트상태", this.state.isStart);
          console.log("면접관 ", this.state.viewers);
          console.log("면접자 ", this.state.viewees);
          console.log("모든유저 ", this.state.allUsers);
          console.log("미팅아이디", this.state.meetingId);

          // 면접관이 평가완료 하고 버튼눌렀을때
          this.state.session.on("signal:next", (event) => {
            // 내가보낸신호면
            if (event.from.connectionId === localUser.connectionId) {
              this.setState({ evalWaiting: true });
            }
            console.log(event);
            let evalnum = this.state.evalnum + 1;
            // 모두평가완료했다면
            if (evalnum === this.state.viewers.length) {
              if (
                this.state.viewers[0].connectionId === localUser.connectionId
              ) {
                // 면접관중 한명만
                if (this.state.customQuesCheck === false) {
                  // 사용자가 만든 질문이 아니라면
                  myAxios
                    .put(
                      "/question/past",
                      { questionId: this.state.curQuesId },
                      {
                        headers: {
                          Authorization: window.localStorage.getItem("jwt"),
                        },
                      }
                    )
                    .then((res) => {
                      console.log(res);
                      console.log("선택질문 count요청보냄");
                      console.log(
                        "childId",
                        this.state.curQuesId,
                        "parentId",
                        this.state.preQuesId
                      );
                      myAxios
                        .put(
                          "/question/relation",
                          {
                            childId: this.state.curQuesId,
                            parentId: this.state.preQuesId,
                          },
                          {
                            headers: {
                              Authorization: window.localStorage.getItem("jwt"),
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res);
                          console.log("연관질문 count요청보냄");
                          this.setState({ preQuesId: this.state.curQuesId });
                        })
                        .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));
                }
              }
              // 전체가
              this.setState({ evalnum: 0, evalWaiting: false });
              this.setState({ chosenQues: "" });
              this.nextViewee();
            } else {
              // 아직 평가 진행중이라면
              this.setState({ evalnum: evalnum });
            }
          });
        });

        this.state.session.on("signal:choiceQues", (event) => {
          console.log(event.data);
          this.setState({ chosenQues: event.data, customQuesCheck: true });
        });

        this.state.session.on("signal:reRecoQues", (event) => {
          console.log(event);
          this.getRecoQues();
          this.setState({
            chosenQues: "",
            customQuesCheck: false,
          });
        });

        this.state.session.on("signal:choiceRecoQues", (event) => {
          console.log(event.data);
          console.log(this.state.meetingId);
          const data = JSON.parse(event.data);
          this.setState({
            chosenQues: data.content,
            curQuesId: data.id,
            customQuesCheck: false,
          });
        });

        // 방장이 면접끝냄
        this.state.session.on("signal:finish", (event) => {
          // alert('면접이 끝났습니다.')
          const isViewer = this.state.viewerState;
          console.log(this.props.test);
          this.setState({ feedbackDialogState: true });
          if (isViewer === false) {
            // 면접자들이면 피드백 정보 받기
            myAxios
              .get(
                `/feedback/meeting?memberId=${this.state.id}&roomId=${this.state.meetingId}`,
                {
                  headers: {
                    Authorization: window.localStorage.getItem("jwt"),
                  },
                }
              )
              .then((res) => {
                console.log(res);
                this.setState({
                  feedbacks: res.data,
                });
              })
              .catch((e) => console.log(e));
            // this.initialize()
            // this.props.navigate('/')
            // // 새로고침 안하면 내부적으로 openvidu에서 연결유지됨
            // window.location.reload()

            console.log(this.state.isStart);
            console.log(this.state.subscribers);
          }
        });
      }
    );
  }

  nextViewee() {
    console.log("다음참가자 들어오세요");
    const vieweesNum = this.state.viewees.length - 1;
    let vieweeIdx = this.state.vieweeIdx;
    if (vieweeIdx === vieweesNum) {
      vieweeIdx = 0;
    } else {
      vieweeIdx++;
    }
    this.getRecoQues();
    this.handleMainVideoStream(this.state.viewees[vieweeIdx]);
    this.setState({ vieweeIdx: vieweeIdx });
  }

  connectToSession() {
    if (this.sessionName !== undefined) {
      // console.log("token received: 111 ", ovToken);
      // console.log("proptoken", this.props.token)
      this.getToken()
        .then((token) => {
          // console.log("token received: ", this.props.token);
          console.log(token);
          this.connect(token);
        })

        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log(
            "There was an error getting the token: 333",
            this.props.token,
            error.code,
            error.message
          );
          alert("There was an error getting the token:", error.message);
        });
    } else {
      this.getToken()
        .then((token) => {
          // console.log("token received: ", this.props.token);
          console.log(token);
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log(
            "There was an error getting the token: 333",
            this.props.token,
            error.code,
            error.message
          );
          alert("There was an error getting the token:", error.message);
        });
    }
  }

  connect(token) {
    const context = {
      clientData: this.state.myUserName,
      id: this.state.id,
      image: this.state.characterNum,
    };
    console.log("커넥트 함수==============");
    console.log(this.state.session);
    this.state.session
      .connect(token, context)
      .then(() => {
        console.log("여기사람있어요");
        this.updateHost().then((firstUser) => {
          console.log("무야호", firstUser);
          const host = firstUser;
          this.setState({ hostId: host });
          if (this.state.session.connection.connectionId === host) {
            this.setState({ ishost: true });
          }
          console.log("업데이트호스트 후 나의 ishost:", this.state.ishost);
        });
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            message: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    let devices = await this.OV.getDevices();
    let videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    localUser.setReady(false);
    localUser.setViewer(null);
    localUser.setId(this.state.id);
    localUser.setImage(this.state.characterNum);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      {
        currentVideoDevice: videoDevices[0],
        localUser: localUser,
        publisher: publisher,
      },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  getRecoQues() {
    myAxios
      .get(
        `/question?meetingroomId=${this.state.meetingId}&parentId=${this.state.preQuesId}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          recoQues: res.data.questionList,
        });
      })
      .catch((e) => console.log(e));
  }

  updateHost() {
    return new Promise((resolve, reject) => {
      console.log(this.OPENVIDU_SERVER_URL);
      axios
        .get(
          `${this.OPENVIDU_SERVER_URL}/openvidu/api/sessions/${this.state.mySessionId}/connection`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${this.OPENVIDU_SERVER_SECRET}`
              )}`,
            },
          }
        )
        .then((response) => {
          console.log("업데이트호스트성공", response);
          console.log(response.data.content);
          let content = response.data.content;
          content.sort((a, b) => a.createdAt - b.createdAt);

          resolve(content[0].id); // connectionid
        })
        .catch((error) => reject(error));
    });
  }

  updateSubscribers() {
    let subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            id: this.state.localUser.getId(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
            ready: this.state.localUser.isReady(),
            viewer: this.state.localUser.isViewer(),
          });
        }
        this.updateLayout();
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    // axios
    //   .get(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", {
    //     headers: {
    //       Authorization:
    //         "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.numberOfElements === 1) {
    //       // 0인지 1인지 실험필요
    //       myAxios
    //         .delete(`/room/waiting?roomId=${this.state.waitingId}`, {
    //           headers: {
    //             Authorization: window.localStorage.getItem('jwt'),
    //           },
    //         })
    //         .then(() => console.log("DB에서 방삭제됨"))
    //         .catch((e) => console.log(e));
    //     }
    //   })
    //   .catch(() => {});

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: undefined,
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }

  readyStatusChanged() {
    localUser.setReady(!localUser.isReady());
    this.sendSignalUserChanged({ ready: localUser.isReady() });
    this.setState({ localUser: localUser });
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      console.log(event);
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // let subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      newUser.setId(JSON.parse(event.stream.connection.data).id);
      newUser.setNickname(JSON.parse(event.stream.connection.data).clientData);
      newUser.setImage(JSON.parse(event.stream.connection.data).image);
      newUser.setReady(false);
      newUser.setViewer(null);
      this.remotes.push(newUser);
      
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on('signal:userChanged', (event) => {
        let remoteUsers = this.state.subscribers;
        remoteUsers.forEach((user) => {
            if (user.getConnectionId() === event.from.connectionId) {
                const data = JSON.parse(event.data);
                console.log('EVENTO REMOTE: ', event.data);
                if (data.isAudioActive !== undefined) {
                    user.setAudioActive(data.isAudioActive);
                }
                if (data.isVideoActive !== undefined) {
                    user.setVideoActive(data.isVideoActive);
                }
                if (data.nickname !== undefined) {
                    user.setNickname(data.nickname);
                }
                if (data.isScreenShareActive !== undefined) {
                    user.setScreenShareActive(data.isScreenShareActive);
                }
            }
        });
        this.setState(
            {
                subscribers: remoteUsers,
            },
            () => this.checkSomeoneShareScreen(),
        );
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById("container");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  initialize() {
    this.setState({
      mainStreamManager: undefined,
      readyState: false,
      viewerState: undefined,
      meetingId: "",
      isFliped: true,
      chatDisplay: "none",
      questions: [],
      isStart: false,
      allReady: false,
      allUsers: [],
      viewers: [],
      viewees: [],
      // 면접관이 질문당 평가하고 이벤트 보낼때 몇명이 평가했는지 보기위해
      evalnum: 0,
      // 다른 면접관이 모두 평가하길 기다리는 상태
      evalWaiting: false,
      // 면접관이 평가완료 누를때마다 다음 면접자로 넘어가기위해 설정한 면접자idx
      vieweeIdx: 0,
      chosenQues: "",
    });
    // 다른 유저들정보 초기화
    const temp = this.state.subscribers;
    temp.forEach((element) => {
      element.setReady(false);
      element.setViewer(null);
    });
    this.remotes = temp;
    this.setState({ subscribers: this.remotes });
    localUser.setReady(false);
    localUser.setViewer(null);
    // this.setState({subscribers: init})

    console.log(this.state.subscribers);
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      let videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        let newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          let newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager()
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      }
    );

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on("streamPlaying", () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }
  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }
  checkSize() {
    if (
      document.getElementById("layout").offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat("none");
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById("layout").offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }
  // 채팅창이랑 사전질문 창 토글 기능
  setValue() {
    if (this.state.value === 1) {
      this.setState({
        value: 0,
        hidden: false,
      });
    } else {
      this.setState({
        value: 1,
        hidden: true,
      });
    }
  }
            
  handleMainVideoStream(stream) {
    // 내차례면 마이크 켜
    this.setState({
      mainStreamManager: stream,
    });
  }

  handleChoiceQues(question) {
    console.log(question);
    setTimeout(() => {
      this.setState({ chosenQues: question });
      console.log("핸들초이스퀘스에서 바꾼 스테이트: ", this.state.chosenQues);
    }, 20);
    // this.props(this.setState({chosenQues: event.target.value}))
  }

  handleFinish() {
    // console.log(this.state.allUsers.map((user) => user.streamManager.stream.connection))
    this.state.session
      .signal({
        data: "",
        to: [],
        type: "finish",
      })
      .then(() => {
        console.log("면접 끝");
        console.log(this.state.session);
      })
      .catch((error) => {});
    // axios 방장이 버튼눌렀으므로 한번만감
    myAxios
      .get(
        `/room/meeting/finish?meetingId=${this.state.meetingId}&roomId=${this.state.waitingId}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => console.log("면접끝 서버로 요청보냄", res))
      .catch((e) => console.log(e));

    myAxios
      .delete(`/room/waiting?roomId=${this.state.waitingId}`, {
        headers: {
          Authorization: window.localStorage.getItem("jwt"),
        },
      })
      .then((res) => console.log("방폭파시킴", res))
      .catch((e) => console.log(e));
  }

  handleCloseFeedback() {
    this.setState({ feedbackDialogState: false });
    this.props.navigate("/");
    // window.localStorage.removeItem("roomId");
    window.localStorage.removeItem("token");
    window.location.reload();
  }

  handleExitBtn() {
    axios
      .get(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", {
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.numberOfElements === 1) {
          // 나혼자 남았으면 방 폭파
          myAxios
            .delete(`/room/waiting?roomId=${this.state.waitingId}`, {
              headers: {
                Authorization: window.localStorage.getItem("jwt"),
              },
            })
            .then(() => console.log("DB에서 방삭제됨"))
            .catch((e) => console.log(e));
        }
      })
      .catch(() => {});
    this.props.navigate("/");
    window.location.reload()
  }


  setManagerLayoutState(){
    if(this.state.managerLayoutState==1) this.setState({ managerLayoutState: 2 });
    else if(this.state.managerLayoutState==2) this.setState({ managerLayoutState: 1 });
    console.log(this.state.managerLayoutState);
    console.log(this.state.isStart);
    console.log(this.state.localUser.viewer);
  }

  render() {
    console.log(this.state)
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    const color = blue[100];
    let chatDisplay = { display: this.state.chatDisplay };
    const mainStreamManager = this.state.mainStreamManager;
    return (
      <div
        style={{
          marginTop: "2%",
          marginLeft: "2%",
          marginRight: "2%",
          marginBottom: '2%',
          // backgroundImage: `url(${background})`,
        }}
      >
        {/* <ToolbarComponent
          sessionId={mySessionId}
          user={localUser}
          isStart={this.state.isStart}
          showNotification={this.state.messageReceived}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          screenShare={this.screenShare}
          stopScreenShare={this.stopScreenShare}
          toggleFullscreen={this.toggleFullscreen}
          switchCamera={this.switchCamera}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
        /> */}
        <Grid
          container
          title=""
          sx={{
            height: "700px",
            display: "flex",
            marginTop: "5px",

            paddingTop: "15px",
            backgroundImage: `url(${background})`,
            borderRadius: 6,
            // backgroundImage: `url(${background})`,
            backgroundColor: color,
            // boxShadow: "0 3px 5px 2px rgba(47, 138, 241, 0.5)",
            //opacity: 0.7,
          }}
        >
          {this.state.isStart ? (
            <>
              <Grid item xs={3}>
                <div id="cont1" style={{height:'60%', marginLeft:"15px", marginTop:"20px"}}>
                <div> <img src={logoImage}></img></div>
                <div><b> 👨‍⚖️ 면접관</b></div>
                  {this.state.viewers.map((sub, i) => (
                    <div
                      key={i}
                      className="stream-container"
                      style={{ height: "50%", marginBottom: "5%", marginTop: "5%" }}
                      id="remoteUsers"
                    >
                      {/* {i===0 ? <div><b>면접관</b></div> : null} */}
                      <StreamComponent
                        user={sub}
                        handleNickname={this.nicknameChanged}
                        style={{height:"50%"}}
                      />
                    </div>
                  ))}
                </div>

                {/* <div>
                  {this.state.isStart && localUser.viewer && (
                    <div style={{height: '40%'}}>
                      <RecommendationQues
                        session={this.state.session}
                        questions={this.state.questions}
                        recoQues={this.state.recoQues}
                        mainStreamManager={this.state.mainStreamManager}
                        handleChoiceQues={(e) => this.handleChoiceQues(e)}
                        preQuesId={this.state.preQuesId}
                        meetingId={this.state.meetingId}
                      />
                    </div>
                  )}
                </div> */}
              </Grid>
              <Grid item xs={6}>
                <div style={{width: "600px", height:'25%'}}> 
                <div style={{marginLeft:"30px"}}><b> 🙍‍♀️ 면접자</b></div>
                  {this.state.viewees.map((sub, i) =>
                    sub !== this.state.mainStreamManager ? (
                      <div
                        key={i}
                        className="stream-container"
                        style={{ float: "left", marginBottom:'10px', marginLeft:"10px" , marginTop:'5%', width:'30%', height:'40%'}}
                        id="remoteUsers"
                      >
                        {/* {i===1 ? <div>면접자</div> : null} */}
                        <StreamComponent3 user={sub} />
                      </div>
                    ) : null
                  )}
                </div>

                <div style={{width:'100%'}}>
                  {this.state.mainStreamManager && (
                    <div className="stream-container" id="remoteUsers">
                      {/* <div>선택된화면</div> */}
                      <StreamComponent2 user={this.state.mainStreamManager} />
                    </div>
                  )}
                </div>
              </Grid>

              {/* <Grid item xs={3}> */}
              <div id="whale">
                {/* TODO */}
                {/* <button onClick={this.setManagerLayoutState}>추천질문</button> */}
                
                {this.state.viewerState === true ?  ( 
                  this.state.isStart && localUser.viewer ?
                    (<div>
                    <div style={{height: '40%'}}>
                      <RecommendationQues
                        session={this.state.session}
                        questions={this.state.questions}
                        recoQues={this.state.recoQues}
                        mainStreamManager={this.state.mainStreamManager}
                        handleChoiceQues={(e) => this.handleChoiceQues(e)}
                        preQuesId={this.state.preQuesId}
                        meetingId={this.state.meetingId}
                        evalWaiting={this.state.evalWaiting}
                      />
                      <EvaluationSheet
                        viewers={this.state.viewers}
                        viewee={this.state.mainStreamManager}
                        session={this.state.session}
                        evalWaiting={this.state.evalWaiting}
                        chosenQues={this.state.chosenQues}
                        curQuesId={this.state.curQuesId}
                        preQuesId={this.state.preQuesId}
                        meetingId={this.state.meetingId}
                        type={this.state.type}
                      />
                    </div>
                  </div>)
                  : (<div>
                  </div>))

                  :
                <div> 
                  <div className="stream-container" id="remoteUsers">
                      {/* <div>선택된화면</div> */}
                      <StreamComponent2Test user={this.state.mainStreamManager} />
                    </div>
                </div>
                }
              </div>
              {/* </Grid> */}
              {this.state.isStart && localUser.viewer && (
                <Button variant="contained" color="success" onClick={this.handleFinish}> 면접끝내기</Button>
              )}
              {this.state.isStart && localUser.viewer &&
                <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                    {localUser !== undefined && localUser.isAudioActive() ? <Mic /> : <MicOff color="secondary" />}
                </IconButton>}
              
              {this.state.isStart && !localUser.viewer &&
              <IconButton className="vieweeMicIcon" color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                  {localUser !== undefined && localUser.isAudioActive() ? <Mic /> : <MicOff color="secondary" />}
              </IconButton>}
            </>
          ) : (
            <>
              {/* 유저 리스트 */}
              <Grid item xs={8}>
                <span style={{marginBottom:'5px', marginLeft:'25px', marginRight:'25px', fontSize:'18px'}}>방제목: {this.state.roomname}</span>
                <Button 
                  onClick={this.handleExitBtn}
                  // variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<LogoutIcon />}

                  >
                  나가기
                </Button>

                <div style={{height: '600px', marginLeft:'1px'}}>
                  <TestUserList
                    session={this.state.session}
                    subscribers={this.state.subscribers}
                    myUserName={this.state.myUserName}
                    ready={this.state.readyState}
                    viewer={this.state.viewerState}
                    localUser={localUser}
                    ishost={this.state.ishost}
                    hostId={this.state.hostId}
                    allReady={this.state.allReady}
                    roomId={this.state.waitingId}
                    characterNum={this.state.characterNum}
                    
                  
                  />
                </div>
                {/* <button onClick={this.handleExitBtn}>나가기</button> */}
                
              </Grid>
              {/* 채팅 */}
              <Grid item xs={4}>
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    <div
                      style={{
                        chatDisplay,
                        marginTop: '50px'
                      }}
                    >
                      <TestQuesList
                        className="row-span-1"
                        session={this.state.session}
                        questions={this.state.questions}
                        ready={this.state.readyState}
                        chatDisplay={this.state.chatDisplay}
                        localUser={localUser}
                        waitingId={this.state.waitingId}
                      />
                      <ChatComponent
                        user={localUser}
                        chatDisplay={this.state.chatDisplay}
                        close={this.toggleChat}
                        messageReceived={this.checkNotification}
                        hidden={!this.state.hidden}
                      />
                    </div>
                  )}
              </Grid>
            </>
          )}
        </Grid>
        {/* 피드백 */}
        {/* 면접자용 */}
        <div>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={this.state.feedbackDialogState && !this.state.viewerState}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={this.handleCloseFeedback}
            >
              면접이 끝났습니다! 피드백들이에요!
            </BootstrapDialogTitle>
            <DialogContent dividers>
              {this.state.feedbacks.map((feedback) => (
                <div>
                  <Typography gutterBottom>
                    받은질문: {feedback.question}
                  </Typography>
                  <Typography gutterBottom>
                    받은점수: {feedback.rate}
                  </Typography>
                  <Typography gutterBottom>
                    피드백: {feedback.comment}
                  </Typography>
                  <Divider />
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleCloseFeedback}>
                확인
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
        {/* 면접관용 */}
        <div>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={this.state.feedbackDialogState && this.state.viewerState}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={this.handleCloseFeedback}
            >
              면접이 끝났습니다!
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                면접을 마치셨습니다. 면접관님의 평가는 면접자들에게 큰 도움이 될
                것입니다!!!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleCloseFeedback}>
                확인
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      console.log(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions");
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                this.OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}
export default TestComponent;
