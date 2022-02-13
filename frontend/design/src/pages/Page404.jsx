import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../images/page404.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0;
  margin: 0;
`;

const Logo = styled.img`
  width: 600px;
`;

const TitleWrapper = styled.div`
  text-align: center;
  width: 60%;
`;

const Title = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 50px;
`;

export const CommonButton = styled.button`
  width: 100%;
  border-bottom: 1px solid #000;
  border-radius: 6px;
  margin: 1em 0 0.25em;
  padding: 0.4em 1em;
  border: 2px solid lightgray;
  color: gray;
  backgroud: white;
`;

export default function Error404() {
  return (
    <Wrapper>
      <Logo src={logo} width="60vh" alt="logo" />
      <TitleWrapper>
        <Title>페이지를 이용할 수 없습니다</Title>
      </TitleWrapper>
      <div>
        <CommonButton>
          <Link to="/">홈으로</Link>
        </CommonButton>
      </div>
    </Wrapper>
  );
}
