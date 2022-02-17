import React, { Component } from 'react';
import axios from '../../../common/http-common'
import Rating from '@mui/material/Rating';
import { Button } from '@material-ui/core';

class EvaluationSheet extends Component {
    constructor(props) {
        super(props);
        const question = this.props.chosenQues ? this.props.chosenQues : ''
        // this.handleQuesInput =this.handleQuesInput.bind(this);
        this.state = {
            question: question,
            rate: undefined,
        };

        this.handleNextBtn = this.handleNextBtn.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.setRate = this.setRate(this);
    }

    
    handleNextBtn(event) {
        //let rate = document.getElementById("rate").value;
        let comment = document.getElementById("comment").value;
        //document.getElementById("rate").value = "";
        document.getElementById("comment").value = "";
        console.log("!!");
        console.log(this.state.rate);
        const data = {  
            "comment": comment,
            "meetingId": this.props.meetingId,
            "memberId": this.props.viewee.id,
            "question": this.props.chosenQues,
            "rate": this.state.rate,
            "type": this.props.type
        }
        console.log(data)
        axios.post('/feedback', data, {
            headers: {
              Authorization: window.localStorage.getItem('jwt'),
            },
          })
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


    setRate(newRate){
        this.setState({
            rate : newRate
        })
        console.log(newRate);
        console.log(this.state.rate);
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

        const tempStyle2={
            display:"inline-block",
            width:"350px",
            height:"200px",
            marginLeft:"1px",
            backgroundColor : 'white',
            //border: '1px solid black',
            //marginTop:"10%",
            borderRadius:"8px",
        }
        const tempStyle3={
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
        }    

        const tempStyle1={
            display:"inline-block",
            width:"260px",
            height:"500px",
            marginLeft:"5px",
            backgroundColor : 'Cornsilk',
            border: '1px solid black',
            marginTop:"5px",
        }
       

        const tempStyle5={
            width:"200px",
            height:"100px",
            marginTop:"5px",
            fontSize: "30pt",
            marginLeft:"10px",
            marginTop:"10px",
            fontSize: "17pt",
        }
        
   
       
        return (
            <div>
                {this.props.evalWaiting ? <div></div> :
                <div style={tempStyle2}>
                  {/* <div style={tempStyle2}>
                    <div style={tempStyle3}>평가지</div>
                  </div> */}             
                  {/* <input onKeyDown={this.handleEnter} onChange={e => this.setState({question: e.target.value})} id="question" style={tempStyle6} placeholder="질문선택" value={this.state.question}></input> */}
                  <div style={{ marginLeft:"10px", marginTop:"5px"}}><b>선택된 질문: {this.props.chosenQues}</b></div>
                  {/* <Typography component="legend">Controlled</Typography> */}
                    <div style={{marginTop:"15px"}}><div style={{float:"left", marginLeft:"10px"}}>평점</div> 
                    <div style={{float:"right", marginRight:"180px"}}> 
                    <Rating
                    name="simple-controlled"
                    value={this.state.rate}
                    onChange={(event, newRate) => {
                        console.log(newRate);
                        this.state.rate = newRate;
                        
                    }}
                    />
                    </div>
                        <div style={{float:"left", marginLeft:"10px", width: "300px"}}>
                        <input type="text" onKeyDown={this.handleEnter} id="comment" size={34} style={tempStyle3} placeholder="코멘트"></input>
                        </div>
                    </div>
                  {/* <input onKeyDown={this.handleEnter} id="rate" style={tempStyle3} placeholder="평점"></input> */}
                    
                    <div style={{float:"left", marginLeft:"10px", marginTop:"20px"}}>
                  <Button variant="contained" color="success" onClick={this.handleNextBtn} disabled={this.props.evalWaiting?true:false}>NEXT</Button>
                  {/* <button onClick={this.handleNextBtn} disabled={this.props.evalWaiting?true:false}>NEXT</button> */}
                  </div>
                </div>
                }
            </div>);
    }
}

export default EvaluationSheet;
