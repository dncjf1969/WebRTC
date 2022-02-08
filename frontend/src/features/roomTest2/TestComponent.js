import React, { Component } from "react";
import axios from "axios";
import "./TestComponent.css";
import { OpenVidu } from "openvidu-browser";
import StreamComponent from "./stream/StreamComponent";
// import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import ChatComponent from "./chat/ChatComponent";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";

//
import TestCharacter from "./Testcharacter/Testcharacter";
import TestUserList from "./TestUserList/TestUserList";
import TestQuesList from "./TestQuesList/TestQuesList";

import imgA from "./testImages/rion.PNG";
import imgB from "./testImages/muzi.PNG";
import imgC from "./testImages/neo.PNG";
import imgD from "./testImages/prodo.PNG";
import imgE from "./testImages/prodo.PNG";
import imgF from "./testImages/prodo.PNG";
import { data } from "jquery";

var localUser = new UserModel();

class TestComponent extends Component {
  constructor(props) {
    super(props);

    // this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
    //   ? this.props.openviduServerUrl
    //   : "https://" + "i6e201.p.ssafy.io" + ":4443";
    this.OPENVIDU_SERVER_URL = "https://localhost:4443"
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "MY_SECRET";
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    // let sessionName = this.props.sessionName
    //   ? this.props.sessionName
    //   : "SessionA";
    let sessionName = window.localStorage.getItem('roomId')
    let userName = this.props.user
      ? this.props.user
      : "OpenVidu_User" + Math.floor(Math.random() * 100);
   
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
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
      // gametype: 인성,직무 면접 
      gametype: 'pushUp',
      // 우리한테 필요없음
      status: 'up',
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
      message: '',
      // 방장 (정의하는 기준 )
      ishost: false,
      hostId: undefined,
      // 토론, pt 한다면 추가 
      timer: false,
      // DB저장용 게임 ID 
      gameId: undefined,
      // 높은 확률로 jwt토큰인데 여기서 사용안했음 
      token: undefined,
      audiostate: false,
      videostate: true,
      // 방제목 결정 
      headerText: '',
      // 
      arrow: false,
      leaved: false,
      isRankModalOpen: false,
      startbuttonstate: true,
      finalRank: [],
      isFliped: true,
      localUser: undefined,
      chatDisplay: "none",
      currentVideoDevice: undefined,
      nowUser: [],
      customSubscriber: [],
      latestUser: undefined,
      questions: [],
    };
    console.log("state다");
    console.log(this.state);
    console.log(localUser)
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
  }

  componentDidMount() {
    console.log('마운트됐다');
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
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
        console.log(this.state.session)
        console.log('나의 ishost:', this.state.ishost)
        
        this.state.session.on("streamCreated", (event) => {
          console.log("스트림크리에이티드")
          console.log(event)
          console.log(this.state.latestUser)
          console.log(localUser)
          this.state.session.signal({
            data: JSON.stringify({ready: this.state.readyState,
            questions: this.state.questions}),
            to: [this.state.latestUser],
            type: 'new-user',
          })
          .then(() => {console.log("정보보냈다")})
          .catch((error) => {});
        })

        this.state.session.on("signal:new-user", (event) => {
          console.log(event)
          console.log("정보받았다")
          const from = event.from.connectionId
          this.state.subscribers.forEach(element => {
            if (element.connectionId === from){
              console.log(element)
              element.setReady(JSON.parse(event.data).ready)
              this.setState({subscribers : this.remotes})
            }
          });
          console.log('지금 내 퀘션', this.state.questions)
          const temp = JSON.parse(event.data).questions
          console.log('들어온 퀘션', temp )
          if (this.state.questions.length === 0) {
            this.setState({questions: temp})
          }
          console.log('다시 내 퀘션', this.state.questions)
          console.log(temp === this.state.questions)
        })

        this.state.session.on("connectionCreated", (event) => {
          console.log("!!! conectioncreated");
          console.log(event)
          this.setState({latestUser: event.connection})
          console.log(this.state.latestUser)
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

          if (this.state.readyState === true) {
            // 레디했다
          }
        });
        // 새유저가 들어왔을 때, 다른사람의 레디 정보가 반영 안됨
        this.state.session.on("signal:readyTest", (event) => {
          console.log(event)
          console.log(event.target.remoteConnections);
          //시그널을 보낸 세션 아이디
          var xx = event.from.connectionId;
          if (xx === localUser.connectionId) {
            this.readyStatusChanged()
            this.setState({readyState: !this.state.readyState})
            console.log("내 레디상태", this.state.readyState)
          }
          console.log(xx + "가 레디를 하겠대 or 레디 취소 하겠대.");
          console.log(this.state.subscribers);
          this.state.subscribers.forEach(element => {
            if (element.connectionId === xx){
              console.log(element)
              element.setReady(!element.ready)
              this.setState({subscribers : this.remotes})
            }
          });
          // for (let i = 0; i < this.state.subscribers.length; i++) {
          //   console.log(this.state.subscribers[i].connectionId)
          //   if (this.state.subscribers[i].connectionId === xx) {
          //     // console.log(this.state)
          //     // this.state.subscribers[i].ready = !this.state.subscribers[i].ready
          //     // // 레디. 이렇게 나오는게 맞는가?
          //     // var temp3 = "ready" + i;

          //     // // 이거 작동 원리 한 번 봐야함
          //     // if (document.getElementById(temp3).innerHTML != "준비 완료!") {
          //     //   document.getElementById(temp3).innerHTML = "준비 완료!";
          //     //   console.log(this.state.nowUser[i]);
          //     //   this.state.nowUser[i].readyState = true;
          //     // } else {
          //     //   document.getElementById(temp3).innerHTML = "준비 중..";
          //     //   this.state.nowUser[i].readyState = false;
          //     // }
          //     // break;
          //   }
          // }
          
        });

        this.state.session.on("signal:makeQues", (event) => {
          //시그널을 보낸 세션 아이디
          var xx = event.from.connectionId;
          console.log(xx + "가 질문 만들겠대.");
          console.log(event);
          var zz = "";
          for (var i = 0; i < this.state.nowUser.length; i++) {
            if (this.state.nowUser[i].sessionID === xx) {
              zz = this.state.nowUser[i].userName;
              break;
            }
          }
          let yy = event.data;
          let fromUserNickname = JSON.parse(event.from.data).clientData
          // 
          this.setState({
            questions: [...this.state.questions, 
              {
                userName:fromUserNickname,
                content:yy
            }]
          })
          console.log(this.state.questions)
        });
        this.state.session.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.updateHost().then((connectionid) => {
            const host = connectionid;
            this.state.session
              .signal({
                data: host,
                to: [],
                type: 'update-host',
              })
              .then(() => {})
              .catch((error) => {});
          });
          this.deleteSubscriber(event.stream.streamManager);
        });
        this.state.session.on('signal:update-host', (event) => {
          this.setState({ hostId: event.data})
          if (this.state.session.connection.connectionId === event.data) {
            this.setState({ ishost: true });
          }
        });
      }
    );
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
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        console.log('여기사람있어요')
        this.updateHost().then((firstUser) => {
          console.log('무야호',firstUser)
          const host = firstUser;
          this.setState({ hostId : host})
          if (this.state.session.connection.connectionId === host){
            this.setState({ ishost: true });
          }
          console.log('업데이트호스트 후 나의 ishost:', this.state.ishost)
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
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
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
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
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

  updateHost() {
    return new Promise((resolve, reject) => {
      console.log(this.OPENVIDU_SERVER_URL)
      axios
        .get(`${this.OPENVIDU_SERVER_URL}/openvidu/api/sessions/${this.state.mySessionId}/connection`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${this.OPENVIDU_SERVER_SECRET}`
              )}`
            },
          }
        )
        .then((response) => {
          console.log('업데이트호스트성공', response)
          console.log(response.data.content)
          let content = response.data.content;
          content.sort((a, b) => a.createdAt - b.createdAt);

          resolve(content[0].id); // connectionid
        })
        .catch((error) => reject(error));
    });
  }
  
  updateSubscribers() {
    var subscribers = this.remotes;
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
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
            ready: this.state.localUser.isReady()
          });
        }
        this.updateLayout();
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      tempNamelist: [
        "이정정",
        "우처리",
        "young남",
        "조소히",
        "hyuna55",
        "동준은쌈디",
        "나는우철",
        "용남",
        "소힝",
        "현아입니다",
      ],
      myUserName: this.tempNamelist[Math.floor(Math.random() * 10)],
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }

  readyStatusChanged() {
    localUser.setReady(!localUser.isReady())
    this.sendSignalUserChanged({ ready: localUser.isReady() })
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
      console.log(event)
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
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
      const nickname = event.stream.connection.data.split("%")[0];
      
      newUser.setNickname(JSON.parse(nickname).clientData);
      newUser.setReady(false)
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
    // this.state.session.on('signal:userChanged', (event) => {
    //     let remoteUsers = this.state.subscribers;
    //     remoteUsers.forEach((user) => {
    //         if (user.getConnectionId() === event.from.connectionId) {
    //             const data = JSON.parse(event.data);
    //             console.log('EVENTO REMOTE: ', event.data);
    //             if (data.isAudioActive !== undefined) {
    //                 user.setAudioActive(data.isAudioActive);
    //             }
    //             if (data.isVideoActive !== undefined) {
    //                 user.setVideoActive(data.isVideoActive);
    //             }
    //             if (data.nickname !== undefined) {
    //                 user.setNickname(data.nickname);
    //             }
    //             if (data.isScreenShareActive !== undefined) {
    //                 user.setScreenShareActive(data.isScreenShareActive);
    //             }
    //         }
    //     });
    //     this.setState(
    //         {
    //             subscribers: remoteUsers,
    //         },
    //         () => this.checkSomeoneShareScreen(),
    //     );
    // });
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

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
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

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
        <h1>{this.state.myUserName}</h1>
        <ToolbarComponent
          sessionId={mySessionId}
          user={localUser}
          showNotification={this.state.messageReceived}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          screenShare={this.screenShare}
          stopScreenShare={this.stopScreenShare}
          toggleFullscreen={this.toggleFullscreen}
          switchCamera={this.switchCamera}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
        />

        {/* <DialogExtensionComponent
          showDialog={this.state.showExtensionDialog}
          cancelClicked={this.closeDialogExtension}
        /> */}

        <div id="layout" className="bounds">
          <TestUserList
            session={this.state.session}
            subscribers={this.state.subscribers}
            myUserName={this.state.myUserName}
            ready={this.state.readyState}
            localUser={localUser}
            ishost={this.state.ishost}
            hostId={this.state.hostId}
          />
          <TestQuesList session={this.state.session} questions={this.state.questions} />
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                {<TestCharacter />}
                {
                  <StreamComponent
                    user={localUser}
                    handleNickname={this.nicknameChanged}
                  />
                }
              </div>
            )}
          {/* {this.state.subscribers.map((sub, i) => (
                        <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                            { <TestCharacter/> }
                            { <StreamComponent user={localUser} handleNickname={this.nicknameChanged} /> }

                        </div>
                    ))} */}
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className="OT_root OT_publisher custom-class"
                style={chatDisplay}
              >
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                />
              </div>
            )}
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
      var data = JSON.stringify({ customSessionId: sessionId });
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
          var error = Object.assign({}, response);
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
      var data = JSON.stringify({});
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
