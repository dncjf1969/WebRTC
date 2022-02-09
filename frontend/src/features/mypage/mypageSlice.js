import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/http-common';


export const loadBestRecord = createAsyncThunk(
  'LOAD_BEST_RECORD',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/record/best');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadDailyRecord = createAsyncThunk(
  'LOAD_DAILY_RECORD',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get('api/calendar/daily', {
        params: { month, year },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadConsecutiveRecord = createAsyncThunk(
  'LOAD_CONSECUTIVE_RECORD',
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/calendar/day-count');
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


