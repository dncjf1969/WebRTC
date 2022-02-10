import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/http-common';

// 유저 정보 불러오기
export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/menber/me', 'a');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const loadUserInfo = createAsyncThunk(
  'LOAD_USER_INFO',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/member/me', 'a');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadFeedback = createAsyncThunk(
  'LOAD_FEEDBACK',
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get('/feedback/count', 'a');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadRoomInfo = createAsyncThunk(
  'LOAD_ROOM_INFO',
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get('/feedback');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const changeUserProfile = createAsyncThunk(
  'CHANGE_USER_PROFILE',
  async (imgNum, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/user/image?imgNum=${imgNum}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);


