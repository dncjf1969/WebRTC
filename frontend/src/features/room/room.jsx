import axios from 'axios';
import React, { useState } from 'react';
import styles from 'styled-components';
import TestComponent from '../roomTest2/TestComponent';
// import DataTable from './roomarray2';

const Wrapper = styles.div`
  background-color: Bisque;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Links = styles.ul`
  & > * {
    margin-right: 25px;
    
  } > span
  {
    cursor: pointer;
  }
`;

function Room() {
  // 유저정보, 방정보를 받아온다
  // axios 유저정보
  // axios 방정보 방제 방인원 방최대인원 면접
  
  return (
    <Wrapper>
      <TestComponent/>
    </Wrapper>
  );
}

 
  
export default Room;