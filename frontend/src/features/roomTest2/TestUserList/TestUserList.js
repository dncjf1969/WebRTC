import React, { Component } from 'react';
import imgA from './testImages/rion.PNG';
import imgB from './testImages/muzi.PNG';
import imgC from './testImages/neo.PNG';
import imgD from './testImages/prodo.PNG';

class TestUserList extends Component {
    constructor(props) {
        super(props);
        this.readyTest = this.readyTest.bind(this);
        this.start = this.start.bind(this);

        this.state = {
            isReady : false,
            userReadyState: [],
            viewerCheck : false,
        };
    }

    
    readyTest(){
        const Select = document.getElementById("role");
        if (Select.value !== "") {
            //signal을 보낸다.
            //이 signal을 받는 것은 200번째줄부터
            console.log(this.props);
            this.props.session.signal({
                data: Select.value,  // 보내는 내용
                to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
                type: 'readyTest'   // 시그널 타입.
            })
            .then(() => {})
            .catch(error => {
                console.error(error);
            });
        } else {
            alert("역할을 정해주세요")
        }



		
    }

    start(){
        const check = (value) => value.ready;
        // console.log('스타트')
        // console.log(this.props)
        if (this.props.subscribers.every(check) && this.props.ready) {
            console.log('모두레디함 스타트')
            this.props.session.signal({
                data: Date.now(),
                to: [],
                type: 'start'
            })
            .then(() => {})
            .catch(error => {
                console.error(error);
            });
        } else {
            console.log('아직 레디안한사람있음')
        }
    }

    

    render() {
        
        // 내꺼
        const tempStyle1={
            display:"inline-block",
            width:"350px",
            height:"180px",
            backgroundColor : 'white',
            border: '2px solid black',

        }
        // 새로 들어오는 애
        const tempStyle2={
            display:"inline-block",
            width:"350px",
            height:"100px",
            backgroundColor : 'white',
            border: '2px solid black',
        }
        // 이미지 사진
        const tempStyle3={
            float: "left",
            width:"100px",
            height:"100px",
        }
        // 준비완료 OR 준비중 font size
        const tempStyle4={
            fontSize: "14pt"
        }

        
        
        // const myNickName = temp.clientData
        return (
            <div>
                <div>
                        <div id="named0" style={tempStyle2}>
                            <div>
                            <div id="seat0"> 내 자리 </div>
                                <img src={ imgA } style={tempStyle4}/>
                                <div id="name0"> {this.props.myUserName} {this.props.ishost ? "방장" : null} </div>
                                <div>
                                <label for="role">역할: </label>
                                    <select id="role" name="role" required disabled={this.props.ready ? true : false}>
                                        <option value="">선택안함</option>
                                        <option value="true">면접관</option>
                                        <option value="false">면접자</option>
                                    </select>
                                </div>
   
                                <div id="ready0" style={tempStyle5}> 
                                    {this.props.ready ? '준비 완료!!!' : '준비 중...'} 
                                </div>
                                <button onClick={this.readyTest}> {this.props.ready ? "레디 해제": "레디"}</button>
                                
                                {this.props.ishost && this.props.allReady ? <button onClick={this.start}>start</button> : null}                    
                                
                            </div>            
                        </div>
                        <div>
                        <div id="seat0"> 내 자리 </div>
                            <img src={ imgA } style={tempStyle3}/>
                            <div id="name0"> {this.props.myUserName} {this.props.ishost ? "방장" : null} </div>
                            <div>
                            <label for="role">역할: </label>
                                <select id="role" name="role" required disabled={this.props.ready ? true : false}>
                                    <option value="">선택안함</option>
                                    <option value="true">면접관</option>
                                    <option value="false">면접자</option>
                                </select>
                            </div>

                            <div id="ready0" style={tempStyle4}> 
                                {this.props.ready ? '준비 완료!!!' : '준비 중...'} 
                            </div>
                            <button onClick={this.readyTest}> {this.props.ready ? "레디 해제": "레디"}</button>
                            
                            {this.props.ishost && this.props.allReady ? <button onClick={this.start}>start</button> : null}                       
                        </div>            
                    </div>
                        <div>
                {this.props.subscribers.map((userInfo) =>
                    <div style={tempStyle2}>
                    <div>
                        <div id="seat1"> {userInfo.nickname}</div>
                            {userInfo.ready ? <div>{userInfo.viewer ? "면접관" : "면접자"}</div>  : null}
                            {userInfo.connectionId === this.props.hostId ? <div>방장</div> : <div>{userInfo.ready ? "준비 완료!!!" : "준비 중..."}</div>}
                        </div>   
                    </div>
                )}
            </div>
                </div>
            </div>);
    }
   
}

export default TestUserList;