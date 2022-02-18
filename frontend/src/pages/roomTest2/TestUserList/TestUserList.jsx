import React, { Component } from "react";
import axios from "../../../common/http-common";
import "./TestUserList.css";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FaPlay } from "react-icons/fa";



class TestUserList extends Component {
  constructor(props) {
    super(props);
    this.readyTest = this.readyTest.bind(this);
    this.start = this.start.bind(this);
    this.informStart = this.informStart.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);

    this.state = {
      isReady: false,
      userReadyState: [],
      viewerCheck: false,
      meetingId: "",
      value: "",
      error: false,
      helperText: "",
    };
  }

  readyTest(e) {
    e.preventDefault();
    if (this.state.value === "") {
      this.setState({
        helperText: "역할을 정해주세요",
        error: true,
      });
    } else if (this.state.value !== "") {
      this.setState({
        error: false,
      });
      this.props.session
        .signal({
          data: this.state.value, // 보내는 내용
          to: [], // 누구한데 보낼건지. 비워있으면 모두에게 보내는거고, 만약 세션 아이디 적으면 그 세션한데만 보내진다.
          type: "readyTest", // 시그널 타입.
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }

  informStart = async (roomId) => {
    await axios
      .get(`/room/meeting/start?roomId=${roomId}`, {
        headers: {
          Authorization: window.localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ meetingId: res.data.roomIdMysql });
        return res;
      })
      .catch((err) => {
        console.log(err)
        return err;
      });
  };


  handleRadioChange = (event) => {
    this.setState({
      value: event.target.value,
      helperText: false,
      error: false,
    });
  };

  async start() {
    const check = (value) => value.ready;
    if (this.props.subscribers.every(check) && this.props.ready) {
      console.log("모두레디함 스타트");

      // 서버에 시작했다는 사실 알려주기 나중에 대기방아이디 받아서
      const roomId = this.props.roomId;
      await this.informStart(roomId);
      console.log(this.state.meetingId);
      this.props.session
        .signal({
          // data: Date.now(),
          //나중에 바꾸기
          data: this.state.meetingId,
          to: [],
          type: "start",
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("아직 레디안한사람있음");
    }
  }
 
  render() {
    // const handleChange = (event) => {
    //   setValue(event.target.value);
    // };
    // const myNickName = temp.clientData
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* 나 */}
          <Grid >
            <Grid item>
              <Card
                sx={{
                  marginTop:'15px',
                  marginLeft: '20px',
                  height: '400px',
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  boxShadow: 3,
                  width: "250px"
                }}
                className="inline-block shadow-cyan-500/30 ring-2 ring-white"
              >
                <img
                  className="inline-block h-15 w-15 rounded-full ring-2 ring-white"
                  src={this.props.characterNum}
                  style={{width: "150px", height: "150px"}}
                  alt=""
                />
                <CardContent>
                  <Typography className="font-extrabold" gutterBottom variant="h5" component="div" color='#1a1e38'>
                    {this.props.myUserName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* <Button size="small">면접관</Button>
                  <Button size="small">면접자</Button> */}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <button
                    onClick={this.readyTest}
                    class="bg-cyan-500 shadow-lg rounded-xl shadow-cyan-500/30 ..."
                  >
                    <h1 className="text-white text-md font-semibold pl-2">
                      {this.props.ready ? "레디 해제" : "레디"}{" "}
                    </h1>{" "}
                  </button> */}

                  <p className="font-extrabold">{this.props.ishost ? "방장" : null}</p>
                </CardActions>
              </Card>
            </Grid>
            <Grid>
              {/* 내가 선택하는 면접관, 면접자 */}
              <div className="m-3 ml-6 flex" style={{height:'65px', width:'250px'}}>
                <form onSubmit={this.readyTest}>
                  <FormControl
                    sx={{ m: 1}}
                    error={this.state.error}
                    variant="standard"
                  >
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="role"
                      value={this.state.value}
                      onChange={this.handleRadioChange}
                    >
                      <FormControlLabel
                        disabled={this.props.ready}
                        value="true"
                        control={<Radio />}
                        label="면접관"
                      />
                      <FormControlLabel
                        disabled={this.props.ready}
                        value="false"
                        control={<Radio />}
                        label="면접자"
                      />
                    </RadioGroup>
                    <FormHelperText>{this.state.helperText}</FormHelperText>
                  </FormControl>
                </form>
              </div>
              <button
                onClick={this.readyTest}
                class="bg-cyan-500 shadow-lg rounded-xl shadow-cyan-500/30 p-2 ml-4"
                style={{width:"250px"}}
              >
                <h1 className="text-white text-md font-semibold">
                  {this.props.ready ? "레디해제" : "레디"}{" "}
                </h1>{" "}
              </button>
              {this.props.ishost && this.props.allReady ? (
                <button
                  onClick={this.start}
                  style={{marginLeft:"17px", width:"250px"}}
                  className="md:m-2 m-auto mt-8 bg-[#5865F2] shadow-md shadow-[#5865f28a]  pt-2 pb-2 pl-6 pr-4 rounded-xl flex flex-row justify-center items-center hover:bg-[#424bb6] ease-linear duration-300"
                >
                  <FaPlay className="animate-ping" size={10} color="#fff" />{" "}
                  <h1 style={{width:"190px"}} className="text-white text-md font-semibold pl-2">
                    Start{" "}
                  </h1>{" "}
                </button>
              ) : null}
            </Grid>
          </Grid>
        </Grid>

        {/* 다른 유저들 */}
        <Grid
          item
          xs={8}
          sx={{
            // flexWrap: "wrap",
            // justifyContent: "space-evenly",
            // display: "inline-flex",
            marginLeft:''

          }}
          id="others"
        >
          {this.props.subscribers.map((userInfo) => (
            
            <Card
              sx={{
                Width: '90px',
                height: '35%',
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-evenly",
                boxShadow: 3,
                margin: 2,
                float: "left",
              }}
            >
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src={userInfo.image}
                alt=""
              />
              {/* 나말고 다른 참가자 카드에 있는 이름 */}
              <div className="flex justify-center" style={{height:'', width:'270px', marginLeft:'3px'}}>
                <Typography className="font-extrabold" gutterBottom variant="h6" component="div">
                  {userInfo.nickname}
                </Typography>
                <Typography className="font-extrabold" variant="body2" color="text.secondary">
                  {userInfo.ready ? (
                    <div>{userInfo.viewer ? "면접관" : "면접자"}</div>
                  ) : null}

                  {/* <Button size="small">면접관</Button>
                  <Button size="small">면접자</Button> */}
                </Typography>
              </div>
              {/* 나말고 다른 참가자 카드에 있는 준비중 or 방장 */}
              <div className="flex justify-center  font-extrabold" style={{height:'', width:'270px', marginLeft:'10px', marginBottom:'5px'}}>
                {userInfo.connectionId === this.props.hostId ? (
                  <div>방장</div>
                ) : (
                  <div>{userInfo.ready ? "준비 완료!!!" : "준비 중..."}</div>
                )}
              </div>
            </Card>
          ))}
        </Grid>
        {/* </Grid> */}
      </Grid>
    );
  }
}

export default TestUserList;
