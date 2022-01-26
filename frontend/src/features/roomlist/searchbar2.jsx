import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { search } from './searchbarSlice';

export default function CustomizedInputBase() {
  const dispatch = useDispatch();
  const [room, setRoom] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // 빈 문자열 검색시 alert, 아닐시 로직 수행
    if (room === '') {
      alert("방 제목을 입력해 주세요")
    } else {
      const data = {
      room
      };
      console.log(data)
      setRoom('')
      dispatch(search(data)); // searchbarSlice에서 가져온 액션, createAsyncThunk로 만든것.
    }
    // console.log(room)
  }

    
  return (
    <Paper onSubmit={handleSubmit}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="면접 방 검색하기"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}