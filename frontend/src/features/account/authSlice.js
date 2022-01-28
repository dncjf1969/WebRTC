import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteToken, saveToken } from "../../common/JWT-common";
import axios from "../../common/http-common";

// signup axios -> REST API, params 필요
// 회원가입
export const signup = createAsyncThunk(
  "SIGNUP", // 액션 이름을 정의해 주도록 합니다.
  async (userInfo) => {
    // 비동기 호출 함수를 정의합니다.
    console.log(userInfo);
    await axios
      .post("/members/signup", userInfo)
      .then((res) => {
        console.log(res)
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
);

// Redux Toolkit의 createAsyncThunk로 비동기 처리하기
// 비동기는 이전 작업 수행 중에도 다른 작업을 수행 할 수 있게 하는 것, 작업이 순차적으로 실행되지 않는 것이다.
// async 를 함수와 같이 사용하면 결과를 직접 반환하는게 아니라 Promise를 반환하게 합니다.
// 그리고 우리의 코드의 Promise가 fulfil될 때 까지 잠시 중단하고, 결과를 반환한다. 
// 그리고 실행을 기다리는 다른 코드들을 중지시키지 않고 그대로 실행되게 한다.
// rejectWithValue는 정의된 페이로드 및 메타와 함께 거부된 응답을 반환하기 위해 작업 생성자에서 return할 수 있는 유틸리티 함수이다.
// axios는 js 기반의 환경에서 http 통신을 수행할때 사용하는 모듈
// axios를 이용하여 API호출을 하는 경우 바로 응답이 오지 않기에, 일반적으로 비동기 방식을 사용한다

// promise 객체에 .then() 을 붙이면 이행 상태의 처리를 할 수 있고, .catch 를 붙이면 실패 상태를 처리할 수 있다.
// 비동기 작업 앞에 await 키워드를 붙이면, 비동기 작업이 결과를 낼 때까지 기다린다.(내가 사용할 결과값이 나올 때까지 await을 포함하고 있는 함수만 일시정지된다.)
// await 는 혼자만 쓸 수 없다. async와 세트로 사용한다. async를 붙이면 그 함수는 Promise 객체를 반환한다.
// 정리하자면, 동기적으로 처리할 일이 있는 비동기 작업에 await 를 붙이고, 해당 작업을 포함하고 있는 함수에 async 를 붙이면 된다.

// 닉네임 중복 검사
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (nickname, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/check_nickname', {
        params: { nickname },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// nickname confirm axios -> REST API, params 필요
// export const checkNickname = createAsyncThunk(
//   "CHECK_NICKNAME",
//   async (nickname) => {
//     // console.log("닉네임 버튼 활성화", nickname);
//     await axios
//       .get(`/members/check/name?name=${nickname}`, nickname)
//       .then((res) => {
//         console.log(res)
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err)
//         return err;
//       });
//   }
// );

export const checkID = createAsyncThunk(
  "CHECK_NICKNAME",
  async (ID) => {
    // console.log("아이디 버튼 활성화", ID);
    await axios
      .get(`/members/check/name?name=${ID}`, ID)
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

// 로그인
export const login = createAsyncThunk(
  "LOGIN",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api//login", userInfo);
      const {
        data: { token },
      } = response;
      saveToken(token);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 로그아웃
export const logout = createAsyncThunk(
  "LOGOUT",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api//logout");
      deleteToken();
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const initialState = {
  user: {},
  isNicknameChecked: false,
  isLoggedin: false,
};

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNicknameCheckedFalse: (state) => {
      state.isNicknameChecked = false;
    },
  },
  // 조사 필요, return 값 찾아야함
  // fullfilled -> 완료되었을 때 무슨 일을 할지? (signup은 로그인 시켜준다, 이런것?)
  extraReducers: {
    // [signup.fulfilled]: (state) => [...state],
    // [checkEmail.fulfilled]: () => [],
    [checkNickname.fullfilled]: () => [],
  },
});
// createSlice = reducer만 생성하여도 reducer의 key 값으로 action까지 자동으로 생성해 주는 기능을 지원
// name : 해당 모듈의 이름을 작성합니다.
// initialState : 해당 모듈의 초기값을 세팅합니다.
// reducers : 리듀서를 작성합니다. 이때 해당 리듀서의 키값으로 액션함수가 자동으로 생성됩니다..
// extraReducers : 액션함수가 자동으로 생성되지 않는 별도의 액션함수가 존재하는 리듀서를 정의합니다. (선택 옵션 입니다.)

// 변수나 함수 앞에 export를 붙이면 내보내기가 가능하다.
// export const { signup } = signUpSlice.actions;
// export const userSelector = (state) => state.user;
export const { setNicknameCheckedFalse } = authSlice.actions;
export default authSlice.reducer;

// slice의 기본적인 아이디어는 이렇다.
// logIn reducer는 logIn action creator 함수와 짝이므로 항상 같이다니게 마련이다.
// 따라서 아예 붙여버린 형태가 slice이다.
