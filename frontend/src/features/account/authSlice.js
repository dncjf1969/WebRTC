import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteToken, saveToken } from '../../common/JWT-common';
import axios from '../../common/http-common';


// 닉네임 중복 검사
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (nickname, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/check_nickname', {
        params: { nickname },
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

//user 정보 불러오기
export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('api/user/me');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 확인
export const checkPassword = createAsyncThunk(
  'CHECK_PASSWORD',
  async (password, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/user/check_password', password);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 닉네임 변경
export const modifyNickname = createAsyncThunk(
  'MODIFY_NICKNAME',
  async ({ newNickname }, { rejectWithValue }) => {
    const data = {
      changeNickname: newNickname,
    };
    try {
      const response = await axios.put('/api/user/nickname', data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 변경
export const modifyPassword = createAsyncThunk(
  'MODIFY_PASSWORD',
  async ({ newPassword }, { rejectWithValue }) => {
    const data = {
      changePassword: newPassword,
    };
    try {
      const response = await axios.put('/api/user/password', data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 회원탈퇴
export const deleteUser = createAsyncThunk(
  'DELETE_USER',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.delete('/api/user');
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const initialState = {
  user: {},
  isAdmin: false,
  isNicknameChecked: false,
  isLoading: false,
};

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNicknameCheckedFalse: (state) => {
      state.isNicknameChecked = false;
    },
    resetUser: (state) => {
      state.user = {};
      state.isAdmin = false;
    },
  },
  extraReducers: {
    [checkNickname.fulfilled]: (state) => {
      state.isNicknameChecked = true;
    },
    [checkNickname.rejected]: (state) => {
      state.isNicknameChecked = false;
    },
    [modifyNickname.fulfilled]: (state) => {
      state.isNicknameChecked = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      const { roles } = action.payload;
      if (roles[0].roleName === 'ROLE_ADMIN') {
        state.isAdmin = true;
      }
      state.user = action.payload;
    },
  },
});

export const { setNicknameCheckedFalse, resetUser } = authSlice.actions;
export default authSlice.reducer;
