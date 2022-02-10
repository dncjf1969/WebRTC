import React, {useState, useEffect} from 'react';
import Header from '../partials/Header';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Button from '@mui/material/Button';
// Gri
import { useNavigate } from 'react-router-dom';
import './WaitingList.css'
// // 방만들기 dialog
import FormDialog from './dialog';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { lightBlue } from '@mui/material/colors';

// 방만들기 input select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from '../common/http-common'

// 방만들기 slider
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

//방만들기 비밀번호 스위치
import Switch from '@mui/material/Switch';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';

//navbar
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function CustomizedInputBase() {
  const [word, setWord] = useState(''); // submit시에 바뀔 변수
  const [room, setRoom] = useState(''); // 입력 value를 담을 변수
  const [rooms, setRooms] = useState([]); // 받아온 rooms를 담을 변수
   
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
        navigate('/roomtest2')
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        return err;
      });
      
    
  };
  // 카드

function Card() {
  return (
    <div className='pt-3 pb-3 px-4 flex flex-col items-center p-6 ' data-aos="zoom-y-out" data-aos-delay="350">
      <div className="pt-5 pb-5 max-w-6xl px-4 sm:px-6 ">
          {/* <WaitingListItem /> */}

  <div class="bg-gray-100 rounded  shadow-xl rounded">
    <div class="max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer card">
      <div>
        <img src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_16-inch-Screen_10182021_big_carousel.jpg.large.jpg" alt="" />
      </div>
      <div class="py-4 px-4 bg-white">
        <h3 class="text-md font-semibold text-gray-600">{this.data.name}</h3>
        <p class="mt-4 font-semibold text-gray-600 text-lg">방제목</p>
        <p class="mt-4 font-thin">비밀방 유무(있으면 키, 없으면 공란)</p>
        <p class="mt-4 font-thin">인원수</p>
        <span class="flex items-center justify-center mt-4 w-full bg-yellow-400 hover:bg-yellow-500 py-1 rounded">

            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        <button class="font-semibold text-gray-800">참여하기</button>
        </span>
      </div>
    </div>

        </div>
        </div>
        </div>
  )
}
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

  const search = (async (roomname) => {
    await axios
      .get(`/room/waiting?keyword=${roomname}`)
      .then((res) => {
        console.log(res.data.list)
        setRooms(res.data.list)
        console.log(rooms[0].name)
        return res.data.list;
      })
      .catch((err) => {
        return err;
      });
  });


  useEffect(() => { search(word) }, [word]);

  function handleSubmit(e) {
    e.preventDefault();
    setWord(room)
  }

  function handleRenew() {
    search('')
  }

  // const color = lightBlue[300]; 
  return (
    <>
      <div className='flex shadow-sm rounded'>
    <Paper onSubmit={handleSubmit}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="스터디를 검색해주세요"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    <IconButton sx={{ p: '10px' }} aria-label="renew" onClick={handleRenew}>
        <AutorenewIcon />
    </IconButton>
    </Paper>
      <Button className='' variant="contained" onClick={handleClickOpen}>방만들기</Button> 
    </div>
      {/* <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 fontsize"onClick={handleClickOpen}>방만들기</a>
                </div> */}

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
          <MenuItem value={"인적성"}>인적성</MenuItem>
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

    <div>
      {rooms.map((room) =>
        <FormDialog key={room.roomId} room={room}/>
      )}
    </div>
    </>


    

  );
}



// 카드

function Card() {
  return (
    <div className='pt-3 pb-3 px-4 flex flex-col items-center p-6 ' data-aos="zoom-y-out" data-aos-delay="350">
      <div className="pt-5 pb-5 max-w-6xl px-4 sm:px-6 ">
          {/* <WaitingListItem /> */}

  <div class="bg-gray-100 rounded  shadow-xl rounded">
    <div class="max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer card">
      <div>
        <img src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_16-inch-Screen_10182021_big_carousel.jpg.large.jpg" alt="" />
      </div>
      <div class="py-4 px-4 bg-white">
        <h3 class="text-md font-semibold text-gray-600">{data.name}</h3>
        <p class="mt-4 font-semibold text-gray-600 text-lg">방제목</p>
        <p class="mt-4 font-thin">비밀방 유무(있으면 키, 없으면 공란)</p>
        <p class="mt-4 font-thin">인원수</p>
        <span class="flex items-center justify-center mt-4 w-full bg-yellow-400 hover:bg-yellow-500 py-1 rounded">

            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        <button class="font-semibold text-gray-800">참여하기</button>
        </span>
      </div>
    </div>

        </div>
        </div>
        </div>
  )
}

// 대기방 화면
function WaitingList() {
  return (
    <section className="relative">
      
      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
        <svg width="1360" height="1078" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header mb-5 />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 " data-aos="zoom-y-out">
        <div className="py-12 md:py-10">

          {/* Section header */}
          <div className="max-w-3xl py-20 mx-auto text-center pb-12 md:pb-20 font-extrabold leading-tighter text-5xl tracking-tighter" data-aos="zoom-y-out">
            
            <h1 className="h1 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">인성면접 스터디</h1>
            <CustomizedInputBase />
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
      </div>
    </div>
      </div>
      
    </div>
    </section>
  );
}

export default WaitingList;