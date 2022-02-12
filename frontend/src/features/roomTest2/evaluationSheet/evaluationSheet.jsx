import React, { Component } from 'react';

class EvaluationSheet extends Component {
    constructor(props) {
        super(props);
        const question = this.props.chosenQues ? this.props.chosenQues : ''
        // this.handleQuesInput =this.handleQuesInput.bind(this);
        this.state = {
            question: question,
        };
        this.handleNextBtn = this.handleNextBtn.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    
    handleNextBtn(event) {
      let rate = document.getElementById("rate").value;
      let comment = document.getElementById("comment").value;
      document.getElementById("rate").value = "";
      document.getElementById("comment").value = "";
      // 이부분에서 axios요청 보냄 //

      // const viewers = this.props.viewers.map((viewer) => viewer.streamManager.stream.connection)
      
      // 면접관들에게 평가했다고 알림
      this.props.session.signal({
              data: '',  
              to: [],
              type: 'next'
            })
            .then(() => {
                console.log('평가완료')
            })
            .catch(error => {
              console.error(error);
            });
    }

    handleEnter(event) {
        if (event.keyCode === 13 && !this.props.ready) {
            
        }
    }
    // handleQuesInput(event) {
    //     this.setState({question: event.target.value})
    //     console.log(this.state.question)
    // }
    
    render() {
        const tempStyle={
            display:"inline-block",
            width:"400px",
            height:"400px",
            marginLeft:"50px",
        }

        const tempStyle2={
            display:"inline-block",
            width:"800px",
            height:"100px",
            marginLeft:"200px",
            backgroundColor : 'white',
            border: '1px solid black',
            marginLeft:"250px",
            marginTop:"50px",
        }
        const tempStyle3={
            display:"inline-block",
            width:"500px",
            height:"100px",
            marginLeft:"200px",
            backgroundColor : 'white',
            border: '1px solid black',
        }

        const tempStyle4={
            float: "left",
            width:"100px",
            height:"100px",
        }

        const tempStyle5={
            width:"700px",
            marginLeft:"10px",
            marginTop:"10px",
            fontSize: "17pt",
        }
        
        const tempStyle6={
            marginLeft:"10px",
        }

        const tempStyle7={
            fontSize: "30pt",
        }
        
        return (
            <div style={tempStyle2}>
                {this.props.evalWaiting ? <div>다른 면접관들이 평가완료할 때까지 기다려주세요!</div> :
                <div>
                  <div style={tempStyle5}>평가지</div>
                  {/* <input onKeyDown={this.handleEnter} onChange={e => this.setState({question: e.target.value})} id="question" style={tempStyle6} placeholder="질문선택" value={this.state.question}></input> */}
                  <div>선택된 질문: {this.props.chosenQues}</div>
                  <input onKeyDown={this.handleEnter} id="rate" style={tempStyle6} placeholder="평점"></input>
                  <input onKeyDown={this.handleEnter} id="comment" style={tempStyle6} placeholder="코멘트"></input>
                  <button onClick={this.handleNextBtn} disabled={this.props.evalWaiting?true:false}>NEXT</button>
                </div>
                }
            </div>);
    }
}

export default EvaluationSheet;
