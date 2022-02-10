import React, { Component } from 'react';

class RecommendationQues extends Component {
    constructor(props) {
        super(props);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
        this.handleChoiceQues = this.handleChoiceQues.bind(this);
        this.state = {
            question: undefined,
        };
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

    handleDeleteBtn(event) {
        console.log(event)
        this.props.session.signal({
            data: event.target.parentElement.id,  // 보내는 내용
            to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
            type: 'deleteQues'   // 시그널 타입.
        })
        .then(() => {
            console.log("delete Question!");
        })
        .catch(error => {
            console.error(error);
        });
    }

    handleChoiceQues(question) {
        console.log(question)
        this.props.session.signal({
            data: question,  // 보내는 내용
            to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
            type: 'choiceQues'   // 시그널 타입.
        })
        .then(() => {
            console.log("choice Question!");
        })
        .catch(error => {
            console.error(error);
        });
    }

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

        const questions = this.props.questions.filter((question) => question.connectionId === this.props.mainStreamManager.connectionId)
        return (
            <div style={tempStyle2}>
                <div>{this.props.mainStreamManager.nickname}</div>
                <div>
                    <div>추천질문1</div>
                    <div>추천질문2</div>
                    <div>추천질문3</div> 
                    <div>
                        {questions.map((question) => 
                        <div id={question.questionId} key={question.questionId}>
                            {question.userName} : {question.content}
                            <button onClick={e => this.handleChoiceQues(question.content)}>선택</button>
                        </div>
                        )}
                    </div>
                    <input type="text" placeholder="질문 직접 입력" onKeyDown={this.handleEnter} />
                </div>
            </div>);
    }
   
}

export default RecommendationQues;