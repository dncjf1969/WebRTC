import React, { Component } from "react";
import axios from "../../../common/http-common";
import "./TestUserList.css";
import Gravatar from "react-gravatar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Select,
  Typography,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { borderRadius, display } from "@mui/system";

// import thumb from "../public/thumb.svg";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";

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
    const headers = {
      headers: {
        Authorization: this.props.jwt,
      },
    };
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
          <Grid>
            <Grid item>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  boxShadow: 3, // p: ,
                }}
                className="inline-block shadow-cyan-500/30 ring-2 ring-white"
              >
                <img
                  className="inline-block h-15 w-15 rounded-full ring-2 ring-white"
                  src={`https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/src/images/${this.props.characterNum}.PNG`}
                  alt=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
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

                  <p>{this.props.ishost ? "방장" : null}</p>
                </CardActions>
              </Card>
            </Grid>
            <Grid>
              <div className="m-3 flex ">
                <form onSubmit={this.readyTest}>
                  <FormControl
                    sx={{ m: 3 }}
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
                    <button
                      onClick={this.readyTest}
                      class="bg-cyan-500 shadow-lg rounded-xl shadow-cyan-500/30 ..."
                    >
                      <h1 className="text-white text-md font-semibold pl-2">
                        {this.props.ready ? "레디 해제" : "레디"}{" "}
                      </h1>{" "}
                    </button>
                  </FormControl>
                </form>
                {/* <label for="role">역할: </label>
                <select
                  id="role"
                  name="role"
                  required
                  disabled={this.props.ready ? true : false}
                >
                  <option value="">선택안함</option>
                  <option value="true">면접관</option>
                  <option value="false">면접자</option>
                </select> */}
              </div>
              {this.props.ishost && this.props.allReady ? (
                <button
                  onClick={this.start}
                  className="md:m-2 m-auto mt-8 bg-[#5865F2] shadow-md shadow-[#5865f28a]  pt-2 pb-2 pl-6 pr-4 rounded-xl flex flex-row justify-center items-center hover:bg-[#424bb6] ease-linear duration-300"
                >
                  <FaPlay className="animate-ping" size={10} color="#fff" />{" "}
                  <h1 className="text-white text-md font-semibold pl-2">
                    Start{" "}
                  </h1>{" "}
                </button>
              ) : null}
              {/* <select
                id="role"
                name="role"
                required
                disabled={this.props.ready ? true : false}
              >
                <option value="">선택안함</option>
                <option value="true">면접관</option>
                <option value="false">면접자</option>
              </select> */}
            </Grid>
          </Grid>
        </Grid>

        {/* 다른 유저들 */}
        <Grid
          item
          xs={8}
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            display: "inline-flex",
          }}
          id="others"
        >
          {this.props.subscribers.map((userInfo) => (
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-evenly",
                boxShadow: 5,
                margin: 2,
              }}
            >
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src={`https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/src/images/${userInfo.image}.PNG`}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {userInfo.nickname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userInfo.ready ? (
                    <div>{userInfo.viewer ? "면접관" : "면접자"}</div>
                  ) : null}

                  {/* <Button size="small">면접관</Button>
                  <Button size="small">면접자</Button> */}
                </Typography>
              </CardContent>
              <CardActions>
                {userInfo.connectionId === this.props.hostId ? (
                  <div>방장</div>
                ) : (
                  <div>{userInfo.ready ? "준비 완료!!!" : "준비 중..."}</div>
                )}
              </CardActions>
            </Card>
          ))}
        </Grid>
        {/* </Grid> */}
      </Grid>
    );
  }
}

export default TestUserList;
