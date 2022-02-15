import React, { Component } from 'react';
import axios from '../../../common/http-common'

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
        const data = {  
            "comment": comment,
            "meetingId": this.props.meetingId,
            "memberId": this.props.viewee.id,
            "question": this.props.chosenQues,
            "rate": rate
        }
        console.log(data)
        axios.post('/feedback', data)
        .then((res)=> console.log(res, '평가 서버로 보냈음'))
        .catch((e) => console.log(e))

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
            width:"350px",
            height:"700px",
            marginLeft:"5px",
            backgroundColor : 'white',
            border: '3px solid black',
            marginTop:"10%",
        }
        const tempStyle3={
            display:"inline-block",
            width:"200px",
            height:"100px",
            marginLeft:"5px",
            backgroundColor : 'white',
            border: '1px solid black',
        }

        const tempStyle4={
            float: "left",
            width:"100px",
            height:"100px",
        }

        const tempStyle5={
            width:"200px",
            height:"100px",
            marginTop:"5px",
            fontSize: "30pt",
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
