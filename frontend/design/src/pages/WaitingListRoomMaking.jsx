import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// // 방만들기 dialog
import FormDialog from './dialog';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { lightBlue } from '@mui/material/colors';
import Button from '@mui/material/Button';

// 방만들기 input select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// 방만들기 slider
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

//방만들기 비밀번호 스위치
import Switch from '@mui/material/Switch';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';

function MakingRoom()  {
    const [word, setWord] = useState(''); // submit시에 바뀔 변수

    // 방만들기 모달
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChecked(false)
    setName('')
    setJob('')
    setType('')
    setMembers(4)
    setPassword(null)
  };


  const [name, setName] = useState('');

  let navigate = useNavigate()
  // 방생성 버튼 
  const handleCreateRoom = async () => {
    
    const data = {
      "job": job,
      "manager": "chris1225",
      "memberMax": members,
      "name": name,
      "password": password !== "" ? password : null,
      "type": type
    };
    console.log(data)
    
    // console.log("아이디 버튼 활성화", ID);
    await axios
      .post(`/room/waiting`, data)
      .then((res) => {
        console.log(res)
        const roomId = res.data.roomId
        window.localStorage.setItem('roomId', roomId);
        // navigate('/roomtest2')
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        return err;
      });
        // 모달 내 select
  const [job, setJob] = useState('');
  const [type, setType] = useState('');

  const handleJobChange = (event) => {
    setJob(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // 모달 내 slider
  const [members, setMembers] = useState(4);
  function valuetext(value) {
    setMembers(value)
    return value;
  }

  // 모달내 비번
  const [password, setPassword] = useState(null)
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
    
  }
  return (
    <>
  <Button  variant="contained" onClick={handleClickOpen}>방만들기</Button> 
  <Dialog open={open} onClose={handleClose}>
      <DialogTitle>방만들기</DialogTitle>
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
      />
        
        
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">분야</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={job}
        label="Age"
        onChange={handleJobChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"IT"}>IT</MenuItem>
        <MenuItem value={"금융"}>금융</MenuItem>
        <MenuItem value={"전기/전자"}>전기/전자</MenuItem>
      </Select>
    </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">면접 종류</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          label="Age"
          onChange={handleTypeChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"인성"}>인성</MenuItem>
          <MenuItem value={"직무"}>직무</MenuItem>
          <MenuItem value={"PT"}>PT</MenuItem>
          <MenuItem value={"토론"}>토론</MenuItem>
        </Select>
      </FormControl>

    <Box sx={{ width: 300 }}>
      <Typography id="input-slider" gutterBottom>
        인원
      </Typography>
      <Slider
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
    <Typography id="switch" gutterBottom>
      비밀번호 설정
    </Typography>
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    {checked ? <TextField
        margin="dense"
        id="password"
        label="비밀번호"
        type="password"
        fullWidth
        variant="standard"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      /> : null}
    
      
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleCreateRoom}>방 생성</Button>
      </DialogActions>
    </Dialog>
    </>
)
}

export default MakingRoom