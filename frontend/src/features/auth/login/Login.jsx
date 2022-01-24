import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteToken } from '../../../common/JWT-common';
import { login } from '../authSlice';

export default function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(login(data))
      .unwrap()
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        if (err.status === 400) {
          toast.error('😥 입력하신 정보를 다시 확인해주세요');
        } else if (err.status === 409) {
          toast.error('😥 이미 로그인된 사용자입니다');
        } else if (err.status === 401) {
          toast.error('😥 아이디와 비밀번호를 다시 확인해주세요');
          deleteToken();
          history.push('/login');
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  }

  // render
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
        >
          <input
            islogininput="true"
            label="이메일"
            onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
            name="email"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={[
              '정보를 입력해주세요',
              '이메일 형식으로 입력해주세요',
            ]}
            variant="outlined"
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
          />
          <input
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
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
          <button yellow="true" type="submit">
            로그인
          </button>
          <button mauve="true">회원가입</button>

        </form>
      </div>
    </div>
  );
}
