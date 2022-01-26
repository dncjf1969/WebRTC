import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../common/http-common';

// createAsyncThunk
// 액션 타입 문자열, 프로미스를 반환하는 비동기 함수, 추가 옵션 순서대로 인자를 받는 함수다.

export const search = createAsyncThunk('SEARCH', async (roomname) => {
  await axios
    .post('/searchroom', roomname)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

const searchbarSlice = createSlice({
  name: 'search',
  initialState: {
    roomname: {},
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [search.pending]: () => {
      console.log('pending');
    },
  },
});

export default searchbarSlice.reducer;

// createSlice = reducer만 생성하여도 reducer의 key 값으로 action까지 자동으로 생성해 주는 기능을 지원
// name : 해당 모듈의 이름을 작성합니다.
// initialState : 해당 모듈의 초기값을 세팅합니다.
// reducers : 리듀서를 작성합니다. 이때 해당 리듀서의 키값으로 액션함수가 자동으로 생성됩니다..
// extraReducers : 액션함수가 자동으로 생성되지 않는 별도의 액션함수가 존재하는 리듀서를 정의합니다. (선택 옵션 입니다.)