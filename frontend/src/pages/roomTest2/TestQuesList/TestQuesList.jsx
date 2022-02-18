import React, { Component } from "react";
import "./TestQuesComponent.css";
import { Fab, Tooltip } from "@material-ui/core";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
        to: [], // 누구한데 보낼건지. 비워있으면 모두에게 보내는거
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
        to: [], // 누구한데 보낼건지. 비워있으면 모두에게 보내는거
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
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div className="ml-36   font-bold">질문 추가</div>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.props.questions.map((question) => (
              <div
                className="grid grid-cols-4"
                id={question.questionId}
                key={question.questionId}
              >
                <div className="col-span-3 question">
                  <span className="userName">{question.userName}</span>:{" "}
                  {question.content}
                </div>
                  {question.connectionId ===
                  this.props.localUser.connectionId ? (
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
            <input
              placeholder="사전 질문 추가해주세요"
              id="input1"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
              disabled={this.props.ready}
            />
            <Tooltip title="보내기">
              <Fab
                size="small"
                id="sendButton"
                onClick={this.makeQues}
                disabled={this.props.ready ? true : false}
              >
                <BorderColorIcon sx={{ color: "white" }} />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

export default TestQuesList;
