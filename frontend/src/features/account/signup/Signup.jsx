import { useState, React, useEffect } from 'react';
// $ npm i react-redux
import { useDispatch } from 'react-redux';
// $ npm i styled-components
import styled from 'styled-components';
// $ npm install @material-ui/core
import { Button } from '@material-ui/core';
// $ npm i react-material-ui-form-validator
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// $ npm i @material-ui/core/styles
import { makeStyles } from '@material-ui/core/styles';
import { signup, checkNickname, checkEmail, checkID } from '../authSlice';

// style
const Wrapper = styled.div`
  background-color: Bisque;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  height: 80%;
  width: 80%;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  font-weight: bold;
`;

const useStyles = makeStyles({
  validator: {
    fontSize: '1.5em',
  },
});

// logic

function SignUp() {
  // local state
  const [email, setEmail] = useState('');
  const [ID, setID] = useState('');
  const [Nickname, setNickname] = useState('');
  const [confirmNumber, setConfirmNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
// useState는 리액트 Hook의 하나이며, 상태 관리의 역할을 한다.
// useState는 항상 2개의 value를 return한다. 첫번째 value는 state이고, 두번째 value는 modifier이다.
// 생성한 action을 useDispatch를 통해 발생시킬 수 있다
// ex. <button onClick={()=>dispatch({type:액션타입})}>

  // setState when user change input
  function handleID(event) {
    const { value } = event.target;
    if (value.length < 10) {
      setID(value);
      return true;
    }
    return false;
  }

  function handleNickname(event) {
    const { value } = event.target;
    if (value.length < 10) {
      setNickname(value);
      return true;
    }
    return false;
  }
  // 닉네임 최대 10글자

  // submit when user click button
  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      'email': email,
      'id': ID,
      'name': Nickname,
      'password': password
    }
    dispatch(signup(data));
  }
  // event.preventDefault() = 기본 클릭 동작 방지하기
  // '/signup' -> 비동기 호출 실시

  // validation (same password)
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [repeatPassword]);
  // useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다.
  // 쉽게 말하면, 클래스형 컴포넌트의 componentDidMount + componentDidUpdate 를 합친 형태라고 이해하면 된다!
  // 비밀번호 확인 창에 "정보를 입력해주세요" 가 뜨게 하는 기능
  // ValidationForm = material.UI
  
  // validation (maxlength)
  useEffect(() => {
    ValidatorForm.addValidationRule('maxNumber', (value) => {
      if (value.length > 9) {
        return false;
      }
      return true;
    });
  }, [ID, Nickname]);

  //잘 모르겠다.
  //없어도 잘 돌아가긴 함.

  return (
    <Wrapper>
      <LoginContainer>
        <Title><h1>WISH</h1></Title>
        <ValidatorForm onSubmit={handleSubmit} className={classes.validatorForm}>
          <TextValidator
            label="아이디"
            onChange={handleID}
            color="secondary"
            name="ID"
            value={ID}
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="최대 10글자입니다."
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
          />
          <Button onClick={() => dispatch(checkID(ID))}>
            중복확인
          </Button>
          <TextValidator
            label="닉네임"
            onChange={handleNickname}
            color="secondary"
            name="nickname"
            value={Nickname}
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="최대 10글자입니다."
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
          />
          <Button onClick={() => dispatch(checkNickname(Nickname))}>
            중복확인
          </Button>
          <TextValidator
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            color="success"
            helperText="양식에 맞게 적어주세요"
            validators={['required', 'isEmail']}
            errorMessages={['정보를 입력해주세요', 'email is not valid']}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
          />
          {/* button disabled 토글 필요 */}
          {/* <Button onClick={() => dispatch(checkEmail(email))}>인증하기</Button>
          <TextValidator
            label="인증번호"
            onChange={(e) => setConfirmNumber(e.target.value)}
            name="confirmNumber"
            value={confirmNumber}
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          <TextValidator
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            value={password}
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
          />
          <TextValidator
            label="비밀번호 확인"
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            validators={['isPasswordMatch', 'required']}
            errorMessages={[
              '비밀번호가 일치하지 않습니다',
              '정보를 입력해주세요',
            ]}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
          />
          <Button type="submit">Submit</Button>
        </ValidatorForm>
      </LoginContainer>
    </Wrapper>
  );
}

export default SignUp;
