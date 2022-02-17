import React, { Component } from 'react';
import axios from '../../../common/http-common'
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import logoImg from '../../../images/logo.PNG';
 
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
            marginLeft:"1px",
            backgroundColor : 'white',
            // border: '1px solid black',
            borderRadius:"8px",
            marginTop:"5%",
            overflow:"scroll",
        }
        const tempStyle3={
            display:"inline-block",
            width:"500px",
            height:"100px",
            marginLeft:"200px",
            backgroundColor : 'white',
            border: '1px solid black',
            borderRadius:"8px",
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

        // const tempStyle8={
        //     float:"right",
        // }

        const tempStyle7={
            fontSize: "30pt",
        }

        const questions = this.props.questions.filter((question) => question.connectionId === this.props.mainStreamManager.connectionId)
        return (
            <div>
            {this.props.evalWaiting ? <div style={{flex:"center", backgroundColor:"white", width:"320px", height:"600px", borderRadius:"8px"}}>
                <div style={{float:"left", marginTop:"30px", marginLeft:"10px", fontSize:"13pt"}}><b>다른 면접관들이 평가완료할 때까지</b></div>
                <div style={{float:"left", marginLeft:"10px", fontSize:"13pt"}}> <b>기다려주세요! 😃</b></div>
                <div style={{float:"right",marginRight:"110px", marginTop:"70px", fontSize:"13pt"}}> <b>❗ 면접관 역할 TIP</b></div>
                <div style={{float:"left", marginTop:"15px", marginLeft:"10px", fontSize:"12pt"}}> <b>면접자가 등록했던 사전 질문을 이용하세요!</b></div>
                <div style={{float:"left", marginTop:"15px", marginLeft:"10px", fontSize:"12pt"}}> <b>곤란한 질문을 던지고 어떻게 대응하는지 지켜보세요!</b></div>
                <div style={{float:"left", marginTop:"15px", marginLeft:"10px", fontSize:"12pt"}}> <b>면접 태도, 자세를 점수에 반영하세요!</b></div>
                <div style={{float:"left", marginTop:"15px", marginLeft:"10px", fontSize:"12pt"}}> </div>
                <div> <img src={logoImg} style={{ float:"left", marginLeft:"55px", marginTop:"160px", opacity:"70%"}}></img></div>
                </div> :
            <div style={tempStyle2}>
                <div style={{float:"left", marginLeft:"10px", marginTop:"5px"}}>면접자 : {this.props.mainStreamManager.nickname}</div>
                <div style={{fontSize:"12pt"}}>
                    <div style={{float:"left", marginLeft:"10px", marginTop:"5px", width:"320px"}}>
                    <Button variant="contained"  onClick={this.handleReloadBtn}>질문새로받기</Button>
                    </div>
                    <div>
                    <div style={{float:"left", marginLeft:"10px", marginTop:"10px"}}> <b>✍ 추천 질문</b></div>
                    </div>
                    {this.props.recoQues.map((question) =>
                    <div style={{width: "300px",float:"left", marginLeft:"10px", marginTop:"20px"}}>
                    <div id={question.id} key={question.id}>
                        <div style={{}}>{question.content}</div>
                        <div style={{float:"right", marginLeft:"10px", cursor:"pointer"}}>
                        <AddCircleIcon color="primary" onClick={e => this.handleChoiceRecommenedQues(question)}></AddCircleIcon>
                         </div>
                    </div>
                    </div>
                    
                    )}
                    <div style={{float:"left", marginLeft:"10px", marginTop:"20px"}}>

                    <div style={{float:"left", marginTop:"10px"}}> <b>✍ 사전 질문</b></div>
                    <div>
                        {questions.map((question) => 
                        <div style={{fontSize:"12pt", width: "300px", float:"left", marginLeft:"10px", marginTop:"20px"}} id={question.questionId} key={question.questionId}>
                            {question.content}
                            <div style={{float:"right", marginLeft:"10px", cursor:"pointer"}}>
                            <AddCircleIcon color="primary" onClick={e => this.handleChoiceRecommenedQues(question)}></AddCircleIcon>
                            </div>
                        </div>
                        )}
                    </div>
                    <div style={{float:"left", marginTop:"30px", width:"320px"}}> <b>✍ 직접 질문</b></div>
                    <div style={{float:"left", marginTop:"10px", marginBottom:"20px", width:"320px"}}>
                    <input type="text" size={34} placeholder="질문 직접 입력" onKeyDown={this.handleEnter} />
                    </div>
                    </div>
                    
                </div>
            </div>}
            </div>);
    }
}

export default RecommendationQues;
