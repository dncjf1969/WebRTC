import React, { Component } from 'react';

class TestQuesList extends Component {
    constructor(props) {
        super(props);

        this.makeQues = this.makeQues.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.state = {
        };
    }

    

    // readyTest(){
	// 	//signal을 보낸다.
	// 	//이 signal을 받는 것은 200번째줄부터
    //     console.log(this.props);
	// 	this.props.session.signal({
	// 		data: 'hello',  // 보내는 내용
	// 		to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
	// 		type: 'readyTest'   // 시그널 타입.
	// 	})
	// 	.then(() => {
    //         if(this.state.isReady === true){
    //             this.state.isReady = false;
    //             console.log("레디 해제.")
    //             document.getElementById("ready0").innerHTML = "준비 중.."
                
    //         } 
    //         else{
    //             this.state.isReady = true;
    //             console.log('레디.');
    //             document.getElementById("ready0").innerHTML = "준비 완료!"
    //         } 
	// 	})
	// 	.catch(error => {
	// 		console.error(error);
	// 	});
    // }

    makeQues(){
        let temp = document.getElementById("input1").value;
        document.getElementById("input1").value = "";
        console.log(temp);
        this.props.session.signal({
            		data: temp,  // 보내는 내용
            		to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
            		type: 'makeQues'   // 시그널 타입.
            	})
            	.then(() => {
                    console.log("make Question!");
            	})
            	.catch(error => {
            		console.error(error);
            	});
    }
    
    handleEnter(event) {
        if (event.keyCode === 13 && !this.props.ready) {
            this.makeQues()
        }
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

        return (
            <div style={tempStyle2}>
                <div style={tempStyle5}>사전질문</div>
                <input onKeyDown={this.handleEnter} id="input1" style={tempStyle6}></input>
                <button onClick={this.makeQues} disabled={this.props.ready ? true : false}>질문 추가</button>
                {this.props.questions.map((question) =>
                <div>
                    {question.userName}: {question.content}
                </div>
                      
                
            )}
            </div>);
    }
   
}

export default TestQuesList;