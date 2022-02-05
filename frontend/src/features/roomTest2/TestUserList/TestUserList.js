import React, { Component } from 'react';
import imgA from './testImages/rion.PNG';
import imgB from './testImages/muzi.PNG';
import imgC from './testImages/neo.PNG';
import imgD from './testImages/prodo.PNG';

class TestUserList extends Component {
    constructor(props) {
        super(props);
        this.readyTest = this.readyTest.bind(this);

        this.state = {
            isReady : false,
            userReadyState: [],
        };
    }

    
    readyTest(){
		//signal을 보낸다.
		//이 signal을 받는 것은 200번째줄부터
        console.log(this.props);
		this.props.session.signal({
			data: 'hello',  // 보내는 내용
			to: [],         // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
			type: 'readyTest'   // 시그널 타입.
		})
		.then(() => {
            if(this.state.isReady === true){
                this.state.isReady = false;
                console.log("레디 해제.")
                document.getElementById("ready0").innerHTML = "준비 중.."
                
            } 
            else{
                this.state.isReady = true;
                console.log('레디.');
                document.getElementById("ready0").innerHTML = "준비 완료!"
            } 
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
                                <div id="name0"> {this.props.userName} </div>
                                <div id="ready0" style={tempStyle5}> {this.props.ready} </div>
                                <div>
                                <button onClick={this.readyTest}> ready </button>
                                </div>
                            </div>            
                        </div>
                        <div>
            {this.props.subscribers.map((userInfo) =>
                <div style={tempStyle3}>
                <div>
                    <div id="seat1"> {userInfo.nickname} </div>
                        <div>{userInfo.ready ? "준비 완료!!!" : "준비 중..."}</div>
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