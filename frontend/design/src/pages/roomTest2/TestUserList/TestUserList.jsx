import React, { Component } from "react";
import axios from "../../../common/http-common"
import "./TestUserList.css";

class TestUserList extends Component {
  constructor(props) {
    super(props);
    this.readyTest = this.readyTest.bind(this);
    this.start = this.start.bind(this);
    this.informStart = this.informStart.bind(this);

    this.state = {
      isReady: false,
      userReadyState: [],
      viewerCheck: false,
      meetingId: ''
    };
  }

  readyTest() {
    const Select = document.getElementById("role");
    if (Select.value !== "") {
      //signal을 보낸다.
      //이 signal을 받는 것은 200번째줄부터
      console.log(this.props);
      this.props.session
        .signal({
          data: Select.value, // 보내는 내용
          to: [], // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
          type: "readyTest", // 시그널 타입.
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("역할을 정해주세요");
    }
  }

  
  informStart = (async (roomId) => {
    const headers = {
      headers: {
        'Authorization': this.props.jwt
      }
    }
    await axios
    .get(`/room/meeting/start?roomId=${roomId}`, headers)
      .then((res) => {
        console.log(res)
        this.setState({meetingId: res.data.roomIdMysql})
        return res;
      })
      .catch((err) => {
        return err;
      });
  });


  async start() {
    const check = (value) => value.ready;
    if (this.props.subscribers.every(check) && this.props.ready) {
      console.log("모두레디함 스타트");

      // 서버에 시작했다는 사실 알려주기 나중에 대기방아이디 받아서
      const roomId = this.props.roomId
      await this.informStart(roomId)
      console.log(this.state.meetingId)
      this.props.session
        .signal({
          // data: Date.now(),
          //나중에 바꾸기
          data: this.state.meetingId,
          to: [],
          type: "start",
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("아직 레디안한사람있음");
    }
  }

  render() {
    // const myNickName = temp.clientData
    return (
      <div>
        <div>
          {/* 나 */}
          <div id="me">
            <div id="seat0"> 내 자리 </div>
            <div id="name0">
              {" "}
              {this.props.myUserName} {this.props.ishost ? "방장" : null}{" "}
            </div>
            <div>
              <label for="role">역할: </label>
              <select
                id="role"
                name="role"
                required
                disabled={this.props.ready ? true : false}
              >
                <option value="">선택안함</option>
                <option value="true">면접관</option>
                <option value="false">면접자</option>
              </select>
            </div>

            <div id="ready0">
              {this.props.ready ? "준비 완료!!!" : "준비 중..."}
            </div>
            <button onClick={this.readyTest}>
              {" "}
              {this.props.ready ? "레디 해제" : "레디"}
            </button>

            {this.props.ishost && this.props.allReady ? (
              <button onClick={this.start}>start</button>
            ) : null}
          </div>
          {/* 다른 유저들 */}
          <div id="others">
            {this.props.subscribers.map((userInfo) => (
              <div>
                <div>
                  <div id="seat1"> {userInfo.nickname}</div>
                  {userInfo.ready ? (
                    <div>{userInfo.viewer ? "면접관" : "면접자"}</div>
                  ) : null}
                  {userInfo.connectionId === this.props.hostId ? (
                    <div>방장</div>
                  ) : (
                    <div>{userInfo.ready ? "준비 완료!!!" : "준비 중..."}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TestUserList;
