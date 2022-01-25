import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Login from '../features/account/login/Login';
import Home from '../features/Home';
import SignUp from '../features/account/signup/Signup';

const Wrapper = styled.div`
  background-color: white;
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
