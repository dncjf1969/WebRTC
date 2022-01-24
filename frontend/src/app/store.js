// combineReducers: 말그대로 reducer를 합침
// configueStore: craeteStroe와 같다.
// 필수값은 reducer필드이다.(하나의 객체 형태로)
// middleware필드를 전달하지 않으면 기본적으로 제공되는 미들웨어가 있다(getDefaultMiddleware) 이 API로 기본 미들웨어를 가져온다.
// 기본 미들웨어로는 redux-thunk
// configureSttore를 통해 생성된 store는 Redux DevTools Extension을 사용하여 dspatch된 action과 history, state 변경사항들을 쉽게 볼 수 있다.
import {
  // combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// store.js는 reducer 및 store 를 모으고 통합

// PersisConfig 함수
// 새로운 persist 선언
// key:reducer의 어느 지점에서부터 데이터를 저장할 것인지
// storage: 웹의 localStorage
const rootPersistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  // whitelist는 로컬 스토리지에 저장할 리듀서를 지정하는 곳 (이걸 생략하면 모든 리듀서가 로컬스토리지에 저장된다.)
  // whitelist: ["admin"],
};

// const rootReducer = combineReducers(account,home, meetingroom,mypage,roomlist에 대한 reducer만들어서 추가)

// configure와 persistedReucer를 사용해 redux-persist화 된 리듀서를 만들어준다.
const persistedReducer = persistReducer(rootPersistConfig);

const store = configureStore({
  // persistConfig가 추가된 reducer
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default function configStore() {
  const persistor = persistStore(store);
  return { store, persistor };
}
