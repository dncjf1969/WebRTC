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
import { signup, checkNickname, checkEmail } from './SignupSlice';

// style
const Wrapper = styled.div`
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
  const [nickname, setNickname] = useState('');
  const [confirmNumber, setConfirmNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  // setState when user change input
  function handleNickname(event) {
    const { value } = event.target;
    if (value.length < 7) {
      setNickname(value);
      return true;
    }
    return false;
  }
  // submit when user click button
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(signup(nickname));
  }

  // validation (same password)
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [repeatPassword]);

  // validation (maxlength)
  useEffect(() => {
    ValidatorForm.addValidationRule('maxNumber', (value) => {
      if (value.length > 10) {
        return false;
      }
      return true;
    });
  }, [nickname]);

  return (
    <Wrapper>
      <LoginContainer>
        <Title><h1>WISH</h1></Title>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            className={classes.validator}
            label="닉네임"
            onChange={handleNickname}
            name="nickname"
            value={nickname}
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="최대 10글자입니다."
          />
          <Button onClick={() => dispatch(checkNickname(nickname))}>
            중복확인
          </Button>
          <TextValidator
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['정보를 입력해주세요', 'email is not valid']}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          {/* button disabled 토글 필요 */}
          <Button onClick={() => dispatch(checkEmail(email))}>인증하기</Button>
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
          />
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
          />
          <Button type="submit">Submit</Button>
        </ValidatorForm>
      </LoginContainer>
    </Wrapper>
  );
}

export default SignUp;