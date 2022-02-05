import React, { Component } from "react";
import axios from "axios";
import "./TestComponent.css";
import { OpenVidu } from "openvidu-browser";
import StreamComponent from "./stream/StreamComponent";
import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import ChatComponent from "./chat/ChatComponent";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";

//
import TestCharacter from "./Testcharacter/Testcharacter";
import Users from "./TestUserList/Users";
import TestQuesList from "./TestQuesList/TestQuesList";

import imgA from "./testImages/rion.PNG";
import imgB from "./testImages/muzi.PNG";
import imgC from "./testImages/neo.PNG";
import imgD from "./testImages/prodo.PNG";
import imgE from "./testImages/prodo.PNG";
import imgF from "./testImages/prodo.PNG";
import TestUserList from "./TestUserList/TestUserList";

let localUser = new UserModel();

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : "https://" + "i6e201.p.ssafy.io" + ":4443";
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "MY_SECRET";
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : "SessionA";
    //let userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);
    let tempNamelist = [
      "이정123",
      "우처리",
      "young남",
      "조소히",
      "현아짱99",
      "동준은쌈디",
      "나는우철",
      "나는용남",
      "소힝",
      "현아입니다",
      "",
    ];
    let userName = tempNamelist[Math.floor(Math.random() * 10)];

    let imgList2 = [
      require("./testImages/muzi.PNG"),
      require("./testImages/muzi.PNG"),
      require("./testImages/neo.PNG"),
      require("./testImages/prodo.PNG"),
      require("./testImages/prodo.PNG"),
    ];
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      currentVideoDevice: undefined,
      nowUser: [],
      imgList: imgList2,
      // isViewer: false,
      roles: new Map(),
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
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
    // 면접관, 면접자 역할 지정 이벤트
    // this.roleChangeButton = this.roleChangeButton.bind(this);
  }

  componentDidMount() {
    // console.log("props다!!!", this.props);
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

    this.layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );
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

        document.getElementById("name0").innerHTML = this.state.myUserName;

        this.state.session.on("connectionCreated", (event) => {
          console.log("!!!");
          console.log(event.target.remoteConnections);
          //this.state.nowUser = event.target.remoteConnections;
          // let temp = event.target.remoteConnections;
          //this.state.nowUser = [];

          //temp.forEach(element => {
          let temp2 = JSON.parse(event.connection.data);
          console.log(temp2);

          let temp = {
            userName: temp2.clientData,
            sessionID: event.connection.connectionId,
            ReadyState: false,
          };

          this.state.nowUser.push(temp);
          //});
          console.log("!?!");
          console.log(this.state.nowUser);
          for (let i = 1; i < this.state.nowUser.length; i++) {
            let temp3 = "name" + i;
            let tempHtml =
              `<img src= "` +
              this.state.imgList[i] +
              `" style="float: left;
                        width:100px;
                        height:100px"/>` +
              `<div>` +
              this.state.nowUser[i].userName +
              `</div>` +
              `<div id="ready` +
              i +
              `" style="font-size:14pt"> 준비 중.. </div>`;

            document.getElementById(temp3).innerHTML = tempHtml;
          }

          if (this.state.isReady === true) {
          }
        });

        this.state.session.on("signal:roleChangeButton", (event) => {
          // let role = event.data;
          console.log(event);
          let role = event.data;
          let rolechanger = event.from.connectionId;

          // A라는 방에 1,2,3 사람이 들어왔다(미디어서버 기본적으로 제공하는 prop+추가생성(내가 여기서 닉네임을 바꾸겠다   restapi갖고 있는 닉네임을 그대로 쓰고 싶어 -> 닉네임 데이터를 props받아서 여기서 갱신해야겠지 -> jwt token   ))

          // 사전질문 삭제 -> 배열에서 걔를 찾아가지고 삭제하고 다시 setState
          // 사전질문  -> 배열에서 걔를 찾아가지고 삭제하고 다시 setState
          if (role !== undefined) {
            this.setState({
              roles: this.state.roles.set(rolechanger, role),
            });
          }
          // this.state.roles.push({ rolechanger, role });
          console.log("역할들이다잉", this.state.roles);

          // roles의 스테이드들을 최신화했어 -> 얘를 방장한테 보내서 roles의 길이가 방 유저의 수랑 같아
          // 그러면 start기능 startabled=true 해서 스타트 버튼 활성화
        });

        this.state.session.on("signal:readyTest", (event) => {
          console.log(event);

          //시그널을 보낸 세션 아이디
          let xx = event.from.connectionId;
          console.log(xx + "가 레디를 하겠대 or 레디 취소 하겠대.");

          for (let i = 0; i < this.state.nowUser.length; i++) {
            if (this.state.nowUser[i].sessionID === xx) {
              break;
            }
          }
        });

        this.state.session.on("signal:makeQues", (event) => {
          //시그널을 보낸 세션 아이디
          let xx = event.from.connectionId;
          console.log(xx + "가 질문 만들겠대.");
          console.log(event.data);
          let zz = "";
          for (let i = 0; i < this.state.nowUser.length; i++) {
            if (this.state.nowUser[i].sessionID === xx) {
              zz = this.state.nowUser[i].userName;
              break;
            }
          }
          let yy = event.data;
          document.getElementById("quesList").innerHTML +=
            `<div style="border: 1px solid black; float:left; width:380px"> <div style="font-size:17pt; margin-left:3px; float:left">` +
            event.data +
            `</div> <div style="float:right">` +
            zz +
            `</div> </div>`;
        });
      }
    );
  }

  connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
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
            "There was an error getting the token:",
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
        this.connectWebCam();
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
        alert("There was an error connecting to the session:", error.message);
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
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
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
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
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
    let chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
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

        <DialogExtensionComponent
          showDialog={this.state.showExtensionDialog}
          cancelClicked={this.closeDialogExtension}
        />

        <div id="layout" className="bounds">
          <TestUserList
            session={this.state.session}
            // nowUser={this.state.nowUser}
            roles={this.roles}
          />
          <TestQuesList session={this.state.session} />
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                {/* { <TestCharacter/> }
                            { <StreamComponent user={localUser} handleNickname={this.nicknameChanged} /> } */}
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
