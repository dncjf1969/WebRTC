import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// style
import { Container, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';

// image
import defaultImage from '../../assets/pt.png';

// component
import MyTable from './Mytable';
// import Calender from './Calender';

// 전체 컨테이너
const Wrapper = styled(Container)`
  display: flex;
  padding: 65px 5px 5px 0px;
  height: 200vh;
  width: 100%;
`;

// 사이드바
const Sidebar = styled.aside`
  max-width: 20%;
`;

const ProfileImage = styled.img`
  left: 0px;
  width: 100%;
`;

// 메인
const Main = styled.main`
  width: 70%;
`;

// 제목
// const Title = styled.div`
//   font-weight: bold;
//   font-size: 3rem;
// `;

// 내용
const Content = styled.span`
  font-size: 2rem;
  display: inline-block;
`;

// 닉네임 이메일
const BasicInfo = styled.section``;

const Nickname = styled.div`
  > button {
    margin-left: 30px;
  }
`;

const Email = styled.div``;

// 기록
const Record = styled.section``;

// footer
const Footer = styled.footer``;

export default function MyPage() {
  const { nickname, email } = useSelector((state) => state.auth.user);
  const badgeLen = 5;

  function handleDeleteBtn() {

  };

  return (
    <>
      <Wrapper>
          <Sidebar>
            <ProfileImage src={defaultImage} alt="profile" />
          </Sidebar>
          <br />
          <br />
        <Main>
          <BasicInfo>
            <Nickname>
              <Content>{nickname}</Content>
              <Link to="/checkpassword">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                >
                  회원정보수정
                </Button>
              </Link>
            </Nickname>
            <Email>
              <Content>{email}</Content>
            </Email>
          </BasicInfo>
          <br />
          <br />
          <Record>
            <h2>내 기록</h2>
            <MyTable />
          </Record>
          <Footer>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteBtn}
            >
              회원탈퇴
            </Button>
          </Footer>
        </Main>
      </Wrapper>
    </>
  );
}