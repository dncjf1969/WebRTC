import React, { Component } from "react";
import imgA from "./testImages/rion.PNG";
import imgB from "./testImages/muzi.PNG";
import imgC from "./testImages/neo.PNG";
import imgD from "./testImages/prodo.PNG";

class TestUserList extends Component {
  constructor(props) {
    super(props);
    const { roles } = this.props;
    this.readyTest = this.readyTest.bind(this);
    this.roleChangeButton = this.roleChangeButton.bind(this);

    this.state = {
      isReady: "false",
      // 역할 확인
      isViewer: "false",
      userReadyState: [],
      //버튼의 text
      role: "역할을 정해주세요",
      ready: "레디안함",
      roleState: [],
    };
  }
  // 역할바꾸는 버튼 누르면 roleChange시그널 호출
  roleChangeButton() {
    console.log(this.props);
    this.props.session
      .signal({
        data: this.state.isViewer,
        to: [],
        type: "roleChangeButton",
      })
      .then(() => {
        if (this.state.isViewer === "true") {
          this.setState({
            isViewer: "false",
            role: "면접자",
          });
        } else {
          this.setState({
            isViewer: "true",
            role: "면접관",
          });
        }
        console.log("role이다", this.state.roles);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  readyTest() {
    //signal을 보낸다.
    //이 signal을 받는 것은 200번째줄부터
    console.log(this.props);
    this.props.session
      .signal({
        data: this.state.isReady, // 보내는 내용
        to: [], // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
        type: "readyTest", // 시그널 타입.
      })
      .then(() => {
        if (this.state.isReady === "true") {
          this.setState({
            isReady: "false",
            role: "면접자",
          });
          // console.log("레디 해제.");
          // document.getElementById("ready0").innerHTML = "준비 중..";
        } else {
          this.state.isReady = "true";
          // console.log("레디.");
          // document.getElementById("ready0").innerHTML = "준비 완료!";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const tempStyle = {
      display: "inline-block",
      width: "400px",
      height: "400px",
      marginLeft: "50px",
    };

    const tempStyle2 = {
      display: "inline-block",
      width: "500px",
      height: "400px",
      marginLeft: "200px",
      backgroundColor: "white",
      border: "1px solid black",
    };
    const tempStyle3 = {
      display: "inline-block",
      width: "500px",
      height: "100px",
      marginLeft: "200px",
      backgroundColor: "white",
      border: "1px solid black",
    };

    const tempStyle4 = {
      float: "left",
      width: "100px",
      height: "100px",
    };

    const tempStyle5 = {
      fontSize: "14pt",
    };
    const { role } = this.state;

    return (
      // roles.
      <div style={tempStyle}>
        <div>
          <div id="named0" style={tempStyle2}>
            <div>
              <div id="seat0"> 내 자리 </div>

              <img src={imgA} style={tempStyle4} />
              <div id="name0"> {this.session} </div>
              <div>
                <button onClick={this.readyTest}>
                  {" "}
                  {this.state.isReady ? "나레디" : "레디안함"}{" "}
                </button>
                <button onClick={() => this.roleChangeButton()}>{role}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TestUserList;
