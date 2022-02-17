import React, { Component } from 'react';
import axios from '../../../common/http-common'
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
 
class RecommendationQues extends Component {
    constructor(props) {
        super(props);
        this.handleChoiceQues = this.handleChoiceQues.bind(this);
        this.handleReloadBtn = this.handleReloadBtn.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleChoiceRecommenedQues = this.handleChoiceRecommenedQues.bind(this);
        this.state = {
            questions: [],
        };
    }
    componentDidMount() {
    }

    handleEnter(event) {
        if (event.keyCode === 13 && !this.props.ready) {
            this.props.session.signal({
                data: event.target.value,  // 보내는 내용
                to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
                type: 'choiceQues'   // 시그널 타입.
            })
            .then(() => {
                console.log("choice Question!");
                event.target.value = ""
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    handleReloadBtn() {
        this.props.session.signal({
            data: '',  // 보내는 내용
            to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
            type: 'reRecoQues'   // 시그널 타입.
        })
        .then(() => {
            console.log("reRecoQues! 신호보냄");
        })
        .catch(error => {
            console.error(error);
        });
    }

    // 이건 대기방에서 등록한 사전질문 선택한 경우
    handleChoiceQues(question) {
        console.log(question)
        this.props.session.signal({
            data: question,  
            to: [],      
            type: 'choiceQues'  
        })
        .then(() => {
            console.log("choice Question!");
        })
        .catch(error => {
            console.error(error);
        });
    }

    handleChoiceRecommenedQues(question) {
        console.log(question)
        const context = {
            'id' : question.id,
            'content' : question.content
        }
        this.props.session.signal({
            data: JSON.stringify(context),  
            to: [],         
            type: 'choiceRecoQues'   
        })
        .then(() => {
            console.log("choice Question!");
        })
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        const tempStyle2={
            display:"inline-block",
            width:"350px",
            height:"400px",
            marginLeft:"5px",
            backgroundColor : 'white',
            // border: '1px solid black',
            marginTop:"5%",
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
            marginLeft:"3px",
        }

        const tempStyle8={
            float:"right",
        }

        const tempStyle7={
            fontSize: "30pt",
        }

        const questions = this.props.questions.filter((question) => question.connectionId === this.props.mainStreamManager.connectionId)
        return (
            <div>
            {this.props.evalWaiting ? <div>다른 면접관들이 평가완료할 때까지 기다려주세요!</div> :
            <div style={tempStyle2}>
                <div style={{float:"left", marginLeft:"10px", marginTop:"5px"}}>면접자 : {this.props.mainStreamManager.nickname}</div>
                <div>
                    <div style={{float:"left", marginLeft:"10px", marginTop:"5px", width:"300px"}}>
                    <Button variant="contained" color="success" onClick={this.handleReloadBtn}>질문새로받기</Button>
                    </div>
                    {this.props.recoQues.map((question) =>
                    <div style={{float:"left", marginLeft:"10px", marginTop:"20px"}}>
                    <div id={question.id} key={question.id}>
                        {question.content}
                        <div style={{float:"right", marginLeft:"10px", cursor:"pointer"}}>
                        <AddCircleIcon color="primary" onClick={e => this.handleChoiceRecommenedQues(question)}></AddCircleIcon>
                        {/* <Button variant="contained" color="success" > 선택</Button> */}
                         {/* <button onClick={e => this.handleChoiceRecommenedQues(question)}>선택</button> */}
                         </div>
                    </div>
                    </div>
                    
                    )}
                    <div>
                        {questions.map((question) => 
                        <div style={{tempStyle8}} id={question.questionId} key={question.questionId}>
                            {question.content}
                            <button onClick={e => this.handleChoiceQues(question.content)}>선택</button>
                        </div>
                        )}
                    </div>
                    <div style={{float:"left", marginLeft:"10px", marginTop:"20px"}}>
                    <input type="text" placeholder="질문 직접 입력" onKeyDown={this.handleEnter} />
                    </div>
                </div>
            </div>}
            </div>);
    }
}

export default RecommendationQues;
