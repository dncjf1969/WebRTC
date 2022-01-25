import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import App from "./app/App.js";
import { Provider } from "react-redux";
// npm install redux-persist
// Redux Persist를 사용하여 앱을 종료해도 지속되는 Store 만듦
// 앱 종료 혹은 새로고침만 해도 저장되어있던 모든 state들이 없어진다.
// 해당 라이브러리를 사용하여 마치 캐시 기능과 같이 상태값을 지속적으로 저장한다.
// import { PersistGate } from "redux-persist/integration/react";

import store from "./app/store";

ReactDOM.render(
  // StrictMode는 애플리케이션 내의 잠재적 문제 알아내기 위한 도구로 UI를 랜더링하지 않으며, 자손들에 대한 부가적 검사와 경고 활성화(없어도 작동은 함)
  // 안전하지 않은 생명주기 사용하는 컴포넌트 발견
  // 레거시 문자열 ref사용에 대한 경고
  // 권장되지 않은 findDOMNode 사용에 대한 경고
  // 예상치 못한 부작용 검사
  // 레거시 context API 검사
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
