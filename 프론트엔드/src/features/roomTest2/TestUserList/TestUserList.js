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
        const tempStyle={
            display:"inline-block",
            width:"400px",
            height:"400px",
            marginLeft:"50px",
        }

        const tempStyle2={
            display:"inline-block",
            width:"500px",
            height:"400px",
            marginLeft:"200px",
            backgroundColor : 'white',
            border: '1px solid black',

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
            fontSize: "14pt"
        }

        
        
        // const myNickName = temp.clientData
        return (
            <div style={tempStyle}>
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
            {this.props.subscribers.map((userInfo) =>
                <div style={tempStyle3}>
                <div>
                    <div id="seat1"> {userInfo.nickname} </div>
                        {userInfo.ready ? <div>{userInfo.viewer ? "면접관" : "면접자"}</div>  : null}
                        {userInfo.connectionId === this.props.hostId ? <div>방장</div> : <div>{userInfo.ready ? "준비 완료!!!" : "준비 중..."}</div>}
                        
                    </div>   
                </div>
            )}
            </div>
                        
                        {/* <div id="named1" style={tempStyle3}>
                        <div>
                            <div id="seat1"> 1번 자리 </div>
                                <div id="name1">
                                </div>
                            </div>   
                        </div>
                        <div id="named2" style={tempStyle3}>
                            <div>
                            <div id="seat2"> 2번 자리 </div>
                                <div id="name2">
                                </div>
                            </div>
                        </div>
                        <div id="named3" style={tempStyle3}>
                        <div>
                            <div id="seat3"> 3번 자리 </div>
                                <div id="name3">
                                </div>
                            </div>
                        </div>
                        <div id="named4" style={tempStyle3}>
                        <div>
                            <div id="seat4"> 4번 자리 </div>
                                <div id="name4">
                                </div>
                            </div>
                        </div>
                        <div id="named5" style={tempStyle3}>
                        <div>
                            <div id="seat5"> 5번 자리 </div>
                                <div id="name5"> 
                                </div>
                            </div>
                        </div> */}
                </div>
            </div>);
    }
   
}

export default TestUserList;