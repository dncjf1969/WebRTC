import React, { useState } from 'react';
import styles from 'styled-components';
import { Container, Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import axios from '../../../common/http-common';
import { saveToken } from '../../../common/JWT-common'
import { useNavigate } from "react-router-dom";

// style
const Wrapper = styles(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: white
`;

const Title = styles.span`
  font-size: 2.5rem;
`;

const LoginContainer = styles.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  justify-content: center;
  align-items: center;

`;




// component
function Login() {
  // 생성한 action을 useDispatch를 통해 발생시킬 수 있다
  // ex. <button onClick={()=>dispatch({type:액션타입})}>
  
  // state
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  //navigate
  const navigate = useNavigate()

  // function
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      'id': ID,
      'password': password,
    };
    login(data); // LoginSlice에서 가져온 로그인 액션, login(data) 는 createAsyncThunk로 만든것.
  }

  async function login (userInfo) {
    try {
      const response = await axios.post('/members/login', userInfo)
      const {
        data: {accessToken},
      } = response;
      saveToken(accessToken);
      console.log(response)
      navigate('/')
      return response;
    } catch (err) {
      return(err.response)
    }
  };

  // render
  return (
    <Wrapper>
      <LoginContainer>
        <Title>☆로그인페이지★</Title>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            label="아이디"
            onChange={(e) => setID(e.target.value)}
            name="email"
            value={ID}
            validators={['required']}
            errorMessages={[
              '정보를 입력해주세요',
            ]}
            variant="outlined"
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextValidator
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit">로그인</Button>
        </ValidatorForm>
      </LoginContainer>
    </Wrapper>
  );
}

export default Login;
