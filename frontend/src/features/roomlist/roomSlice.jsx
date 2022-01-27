import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../common/http-common';


// createAsyncThunk
// 액션 타입 문자열, 프로미스를 반환하는 비동기 함수, 추가 옵션 순서대로 인자를 받는 함수다.

export const searchRoom = createAsyncThunk(
  "SEARCH",
  async (word) => {
    await axios
      .get(`/room/waiting?keyword=${word}`, word)
      .then((res) => {
        console.log(res)
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        return err;
      });
  }
);

const roomSlice = createSlice({
  name: "room", // 초기 state 값
  initialState: [],
  reducers: {},
});

export default roomSlice.reducer;