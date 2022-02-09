// store.js는 reducer 및 store 를 모으고 통합
// combineReducers: 말그대로 reducer를 합치는 함수
// configueStore: store를 만들어주는 함수(craeteStroe와 같다.)
// 필수값은 reducer필드이다.(하나의 객체 형태로)
// middleware필드를 전달하지 않으면 기본적으로 제공되는 미들웨어가 있다(getDefaultMiddleware 이 API로 기본 미들웨어를 가져온다.)
// 기본 미들웨어로는 redux-thunk
// configureSttore를 통해 생성된 store는 Redux DevTools Extension을 사용하여 dspatch된 action과 history, state 변경사항들을 쉽게 볼 수 있다.
import { combineReducers, createStore, configureStore } from "@reduxjs/toolkit";

// 액션명 정의
const SAVE = "SAVE";
const DELETE = "DELETE";

// 액션 생성 함수
const saveToken = token => {
  return {
    type: SAVE,
    token
  };
};

const deleteToDo = id => {
  return {
    type: DELETE,
    id
  };
};

// 리듀서
const tokenReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE:
      return [ action.token ];
    case DELETE:
      return state.filter(toDo => toDo !== action.id);
    default:
      return state;
  }
};


// 각 리듀서를 합침
const rootreducer = combineReducers({
  // signup: SignUpReducer,
  // auth: AuthReducer,
  // login: LoginReducer,
  tokenReducer
});

// 합친 리듀서 연결
const store = createStore(
  rootreducer // 합친 리듀서 연결
);

// 다른 컴포넌트에서 action을 하나하나 import하지 않고 action creators만 import하기위해
export const actionCreators = {
  saveToken,
  deleteToDo
}

export default store; // 외부 인스톨이 가능하게 해줌


// Redux Toolkit
// combineReducers 는 여러개의 서브리듀서를 하나로 합쳐줍니다. 이 과정에서 함수에 객체를 전달하게 되는데, 이 객체의 구조에 따라 합쳐진 리듀서의 상태의 구조가 만들어집니다.
// configureStore는 createStore()의 역할을 한다. 이 것을 사용하여 dispatch된 action과 history 그리고 state변경사항들을 쉽게 볼 수 있다.
