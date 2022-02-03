import React, { Component } from "react";

class QuestList extends Component {
  constructor(props) {
    super(props);

    this.makeQues = this.makeQues.bind(this);

    this.state = {};
  }

  makeQues() {
    let myQuestion = document.getElementById("myQuestion").value;
    document.getElementById("myQuestion").value = "";
    console.log("오잉", myQuestion);
    this.props.session
      .signal({
        data: myQuestion, // 보내는 내용
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

  render() {
    const tempStyle2 = {
      display: "inline-block",
      width: "800px",
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
      <div style={tempStyle2}>
        <div style={tempStyle5}>사전질문</div>
        <input id="myQuestion" style={tempStyle6}></input>
        <button onClick={this.makeQues}>질문 추가</button>
        <div id="quesList"></div>
      </div>
    );
  }
}

export default QuestList;
