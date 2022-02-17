import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../common/http-common";

// // 방만들기 dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { lightBlue } from "@mui/material/colors";
import Button from "@mui/material/Button";

// 방만들기 input select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// 방만들기 slider
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

//방만들기 비밀번호 스위치
import Switch from "@mui/material/Switch";

function WaitingRoomModal({ modalClose }) {
  console.log(modalClose);
  // 모달 내 select
  const [job, setJob] = useState("");
  const [type, setType] = useState("");
  // 모달 내 slider
  const [members, setMembers] = useState(4);
  // 모달내 비번
  const [password, setPassword] = useState(null);
  const [checked, setChecked] = useState(false);
  useEffect(() => setJob(""), [type]) 
  // 방만들기 모달
  // const [open, setOpen] = useState(false);

  const handleClose = () => {
    setChecked(false);
    setName("");
    setJob("");
    setType("");
    setMembers(4);
    setPassword(null);
    modalClose();
  };

  const [name, setName] = useState("");

  let navigate = useNavigate();
  // 방생성 버튼
  const handleCreateRoom = async () => {
    if (name === "") {
      alert("방제목을 입력해주세요");
    } else if (type === "") {
      alert("면접 종류를 선택해주세요")
    } else if (type === "직무" && job === "")  {
      alert("카테고리를 선택해주세요")
    } else if (checked && !password) {
      alert("비밀번호를 설정해주세요");
    } else {
      const data = {
        job: job,
        manager: window.localStorage.getItem("id"),
        memberMax: members,
        name: name,
        password: password !== "" ? password : null,
        type: type,
      };
      console.log(data);

      // console.log("아이디 버튼 활성화", ID);
      // 여기는 대기방생성모달로 지금 axios요청 보냄
      await axios
        .post(`/room/waiting`, data, {
          headers: {
            Authorization: window.localStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          const roomId = res.data.roomId;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("roomId", roomId);
          navigate("/waitingroom");
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          alert("오류가 발생하였습니다.")
          return err;
        });
    }
  };

  const handleJobChange = (event) => {
    setJob(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  function valuetext(value) {
    setMembers(value);
    return value;
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <Dialog open={true} onClose={handleClose} sx={{
            border: 3,
            borderRadius: 3
          }}>
        <DialogTitle 
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            mt: 1,
          }}
        >방만들기</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="방제목"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            value={name}
            sx={{ fontFamily: 'sans-serif' }}
          />

          <FormControl sx={{ minWidth: 150, mt: '20px', ml: '10px', mr: '30px'}}>
            <InputLabel 
              id="demo-simple-select-helper-label" 
              sx={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              면접 종류
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={type}
              label="Age"
              onChange={handleTypeChange}
              sx={{ height: '50px'}}
            >
              <MenuItem 
                value={"인성"}
                sx={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                인성
              </MenuItem>
              <MenuItem 
                value={"직무"}
                sx={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                직무
              </MenuItem>
              {/* <MenuItem value={"토론"}>토론</MenuItem>
              <MenuItem value={"pt"}>pt</MenuItem> */}
            </Select>
          </FormControl>
          {type === "직무" && 
          <FormControl sx={{ minWidth: 150, mt: '20px', ml: '10px', mr: '30px'}}>
            <InputLabel 
              id="demo-simple-select-helper-label" 
              sx={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>
                카테고리
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={job}
              label="Age"
              onChange={handleJobChange}
              sx={{ height: '50px'}}
            >
              {/* <MenuItem value={"인성"}>인성</MenuItem> */}
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"금융"}>금융</MenuItem>
              <MenuItem value={"영업"}>영업</MenuItem>
              {/* <MenuItem value={"토론"}>토론</MenuItem>
              <MenuItem value={"pt"}>pt</MenuItem> */}
            </Select>
          </FormControl>}
          

          <Box sx={{ width: 300, mt: 3, ml: 1}}>
            <Typography 
              id="input-slider" 
              gutterBottom
              sx={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              인원
            </Typography>
            <Slider
              mt
              aria-label="Members"
              defaultValue={4}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={6}
            />
          </Box>
          {/* <Typography 
            sx={{
              fontSize: 15,
              fontWeight: 'bold',
              mt: 2,
              ml: 1
            }}
            id="switch" 
            gutterBottom
          >
            비밀번호 설정
          </Typography> */}
          {/* <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          /> */}
          {checked ? (
            <TextField
              margin="dense"
              id="password"
              label="비밀번호"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{
                fontWeight: 'bold',
                mt: '0px'
              }}
            />
          ) : null}
        </DialogContent>
        <DialogActions 
          sx={{
            mr: '10px',
            mb: '10px'
          }}
        >
          <Button 
            size="large"
            sx={{
              fontWeight: 500,
              borderRadius: 3,
            }}
            onClick={handleClose}>취소</Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 500,
              borderRadius: 3,
            }}
            onClick={handleCreateRoom}
          >
            방 생성
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WaitingRoomModal;
