import React, { Component } from "react";
import axios from "../../../common/http-common";
import "./TestQuesComponent.css";
class TestQuesList extends Component {
  constructor(props) {
    super(props);

    this.makeQues = this.makeQues.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
    this.state = {};
    this.chatScroll = React.createRef();
  }

  makeQues() {
    let temp = document.getElementById("input1").value;
    document.getElementById("input1").value = "";
    console.log(temp);
    this.props.session
      .signal({
        data: JSON.stringify({
          question: temp,
          questionId: String(Date.now()),
        }), // 보내는 내용
        to: [], // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
        type: "makeQues", // 시그널 타입.
      })
      .then(() => {
        console.log("make Question!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleEnter(event) {
    if (event.keyCode === 13 && !this.props.ready) {
      this.makeQues();
    }
  }
  handleDeleteBtn(event) {
    console.log(event);
    this.props.session
      .signal({
        data: event.target.parentElement.id, // 보내는 내용
        to: [], // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
        type: "deleteQues", // 시그널 타입.
      })
      .then(() => {
        console.log("delete Question!");
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
      marginLeft: "5px",
    };

    const tempStyle2 = {
      display: "inline-block",
      width: "300px",
      height: "200px",
      marginLeft: "2px",
      backgroundColor: "white",
      border: "1px solid black",
      marginLeft: "2px",
      marginTop: "10px",
    };
    const tempStyle3 = {
      display: "inline-block",
      width: "50px",
      height: "10px",
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
      width: "100px",
      marginLeft: "5px",
      marginTop: "5px",
      fontSize: "17pt",
    };

    const tempStyle6 = {
      marginLeft: "10px",
    };

    const tempStyle7 = {
      fontSize: "30pt",
    };

    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div id="navInput"></div>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.props.questions.map((question) => (
              <div id={question.questionId} key={question.questionId}>
                {question.userName}: {question.content}
                {question.connectionId === this.props.localUser.connectionId ? (
                  <button
                    disabled={this.props.ready ? true : false}
                    onClick={this.handleDeleteBtn}
                  >
                    X
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <div id="messageInput">
            <input onKeyDown={this.handleEnter} id="input1"></input>
            <button
              onClick={this.makeQues}
              disabled={this.props.ready ? true : false}
            >
              질문 추가
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TestQuesList;