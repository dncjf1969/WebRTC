import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import App from "./app/App.js";
import { Provider } from "react-redux";
// npm install redux-persist
// Redux Persist를 사용하여 앱을 종료해도 지속되는 Store 만듦
// 앱 종료 혹은 새로고침만 해도 저장되어있던 모든 state들이 없어진다.
// 해당 라이브러리를 사용하여 마치 캐시 기능과 같이 상태값을 지속적으로 저장한다.
import { PersistGate } from "redux-persist/integration/react";

import configStore from "./app/store";

const { store, persistor } = configStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
