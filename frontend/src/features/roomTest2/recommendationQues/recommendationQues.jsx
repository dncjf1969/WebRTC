import React, { Component } from 'react';

class recommendationQues extends Component {
    constructor(props) {
        super(props);

        this.makeQues = this.makeQues.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
        this.state = {
        };
    }

    
    handleEnter(event) {
        if (event.keyCode === 13 && !this.props.ready) {
            this.makeQues()
        }
    }
    handleDeleteBtn(event) {
        console.log(event
            )
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
            

            </div>);
    }
   
}

export default recommendationQues;