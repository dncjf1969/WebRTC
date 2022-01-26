// React+Redux는 상태관리를 하는 전용 장소(store)에서 상태를 관리하고, React 컴포넌트는 그걸 보여주기만 하는 용도로 쓰인다.
// Store 는 리덕스에서 가장 핵심적인 인스턴스이다.
//  이 안에 현재 상태를 내장하고있고, 구독(subscribe)중인 함수들이 상태가 업데이트 될 때 마다 다시 실행되게 해준다.

<<<<<<< HEAD
// Reducer = Store의 문지기
// combineReducers = reducer를 모아주는 함수
// configureStore =  store를만들어주는 함수
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SignUpReducer from '../features/account/authSlice';
=======
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SignUpReducer from "../features/account/authSlice";
// reducer를 모아주는 함수,store를만들어주는 함수
import AuthReducer from "../features/account/authSlice";
>>>>>>> e1ec463c6efbe498650c6f43bbdde2680679827b

const rootreducer = combineReducers({
  // 각 리듀서를 합침
  SignUpReducer,
});

// const store = createStore(counter)
const store = configureStore({
  reducer: rootreducer, // 합친 리듀서 연결
<<<<<<< HEAD
=======
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
>>>>>>> e1ec463c6efbe498650c6f43bbdde2680679827b
});

export default store; // 외부 인스톨이 가능하게 해줌


// Redux Toolkit
// combineReducers 는 여러개의 서브리듀서를 하나로 합쳐줍니다. 이 과정에서 함수에 객체를 전달하게 되는데, 이 객체의 구조에 따라 합쳐진 리듀서의 상태의 구조가 만들어집니다.
// configureStore는 createStore()의 역할을 한다. 이 것을 사용하여 dispatch된 action과 history 그리고 state변경사항들을 쉽게 볼 수 있다.
