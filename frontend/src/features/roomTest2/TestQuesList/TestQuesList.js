import React, { Component } from "react";
import { Tooltip, SnackbarContent } from "@material-ui/core";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Fab from "@material-ui/core/Fab";
import "./ChatComponent.css";
class TestQuesList extends Component {
  constructor(props) {
    super(props);

    this.makeQues = this.makeQues.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
    this.state = {};
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
    const tempStyle2 = {
      display: "inline-block",
      width: "300px",
      height: "100px",
      marginLeft: "200px",
      backgroundColor: "white",
      border: "1px solid black",
      marginLeft: "250px",
      marginTop: "50px",
    };

    const tempStyle5 = {
      width: "700px",
      marginLeft: "10px",
      marginTop: "10px",
      fontSize: "17pt",
    };

    const tempStyle6 = {
      marginLeft: "10px",
    };

    return (
      <div id="chatContainer">
        <div id="chatComponent">
          <div id="navInput">
            <div className="message-wrap" ref={this.chatScroll}>
              {this.props.questions.map((question, i) => (
                <p>{question.context}</p>
                // <div key={i} id={question.questionId}>
                //   <div className="msg-detail">
                //     <div className="msg-info">
                //       <p> {question.userName}</p>
                //     </div>
                //     <div className="msg-content">
                //       <span className="triangle" />
                //       <p className="text">{question.content}</p>
                //     </div>
                //   </div>
                // </div>
              ))}
            </div>
          </div>

          <div id="messageInput">
            <input
              placeholder="질문을 추가해주세요"
              id="input1"
              onKeyDown={this.handleEnter}
            />
            <Tooltip title="보내기">
              <Fab
                size="small"
                id="sendButton"
                onClick={this.makeQues}
                disabled={this.props.ready ? true : false}
              >
                <ChatOutlinedIcon sx={{ color: "white" }} />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
      // <div style={tempStyle2}>
      //   <div style={tempStyle5}>사전질문</div>
      //   <input
      //     onKeyDown={this.handleEnter}
      //     id="input1"
      //     style={tempStyle6}
      //   ></input>
      //   <button
      //     onClick={this.makeQues}
      //     disabled={this.props.ready ? true : false}
      //   >
      //     질문 추가
      //   </button>
      //   {this.props.questions.map((question) => (
      //     <div id={question.questionId} key={question.questionId}>
      //       {question.userName}: {question.content}
      //       {question.connectionId === this.props.localUser.connectionId ? (
      //         <button
      //           disabled={this.props.ready ? true : false}
      //           onClick={this.handleDeleteBtn}
      //         >
      //           X
      //         </button>
      //       ) : null}
      //     </div>
      //   ))}
      // </div>
    );
  }
}

export default TestQuesList;
