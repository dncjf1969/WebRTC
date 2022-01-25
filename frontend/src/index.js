// '메인 프로그램'
// 여기에서 HTML 템플릿 및 JavaScript의 컴포넌트를 조합하여 렌더링하고 실제 표시한다.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import App from './app/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Provider는 react-redux 라이브러리에 내장되어있는, 리액트 앱에 store를 손쉽게 연동할 수 있도록 도와주는 컴포넌트이다.
//이 컴포넌트를 불러온 다음에, 연동할 컴포넌트를 감싸준 후, Provider 컴포넌트의 props로 store 값을 설정해주면 됩니다.
//이제 우리의 App 컴포넌트가 store 에 연동되었다.