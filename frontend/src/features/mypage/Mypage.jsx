import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/http-common';

import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// style
import { Container, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';



// image
import defaultImage from '../../assets/pt.png';
import profileImages from '../../assets/logo.png';

// component
import MyTable from './Mytable';
import DeleteModal from './DeleteModal';
// import Graph from './graph'
import Chart from './chart';


// action
import { deleteToken } from '../../common/JWT-common';
// import { loadUser } from '../account/authSlice';

// 전체 컨테이너
const Wrapper = styled(Container)`
display: flex;
padding: 100px 0px 0px 0px;
height: auto;
`;
// 사이드바
const Sidebar = styled.aside`
display: flex;
flex: 1;
justify-content: center;
margin-left: 5%;
`;

const ProfileImage = styled.img`
width: 150px;
height: 150px;
background: linear-gradient(45deg, #ffa1b5 30%, #ffa87a 80%);
border-radius: 50%;
border: ${(props) => (!props.isMouseOver ? '1px solid' : '5px solid')};
cursor: pointer;
border-color: ${(props) => (!props.isMouseOver ? 'white' : '#edb9bb')};
`;

// 선택할 수 있는 프로필 image 뿌려주기
const VariousImage = styled.img`
  width: 95px;
  margin: 5px;
  cursor: pointer;
  border: 2px solid;
  border-radius: 50%;
  border-color: #f5e4e7;
`;

const SelectedImage = styled.img`
  width: 95px;
  margin: 5px;
  cursor: pointer;
  border: 4px solid;
  border-radius: 50%;
  border-color: #ff859f;
  background: linear-gradient(45deg, #ffa1b5 30%, #ffa87a 80%);
`;

// 메인
const Main = styled.main`
  width: 70%;
`;

// 제목
const Title = styled.div`
display: inline-box;
margin-bottom: ${(props) => (props.getMoreMB ? '40px' : '20px')};
margin-top: ${(props) => (props.getMoreMT ? '40px' : '0px')};
font-weight: bold;
font-size: 1.5rem;
border-bottom: 5px solid rgba(251, 209, 75, 0.5);
`;

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

const CommonButton = styled(Button)`
  width: 100%;
  border-radius: 6px;
  padding: 0.4em 1em;
  background: #9fa9d8;
  color: white;

  &:hover {
    background: #8090d8;
    color: white;
  }
`;

const ContentContainer = styled.div`
  display: flex;
`;

const Email = styled.div``;

// 기록
const Record = styled.section``;

// 메세지
const Message = styled.p`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
`;

// footer
const Footer = styled.footer`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  margin: 50px 0;
`;

// 그래프
const oneChart = styled.span`
  width: 10px;
  display: flex;
  justify-content: flex-end;
  margin: 0;
`;

// tooltip
const ProfileTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#9FA9D8',
    color: 'white',
    maxWidth: 280,
    fontSize: 11,
    border: '1px solid #9FA9D8',
  },
}))(Tooltip);

//slice
const changeUserProfile = createAsyncThunk(
  'CHANGE_USER_PROFILE',
  async (imgNum, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/user/image?imgNum=${imgNum}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 유저 정보 불러오기
export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('api/user/me');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export default function MyPage() {
  // const { nickname, email, img } = useSelector((state) => state.auth.user);
  const nickname = 'lee';
  const email = 'dncjf1969@naver.com';
  const img = null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [mouseState, setMouseState] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  function handleDeleteBtn() {
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = () => {
    // setOpen(false);
    if (Number(img) === currentImage) return;
    dispatch(changeUserProfile(currentImage.toString()))
      .then(() => {
        dispatch(loadUser());
        toast.success('🎨 프로필 사진이 변경되었습니다!');
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요!');
          deleteToken();
          navigate.push('/login');
        } else if (err.status === 500) {
          navigate.push('/error');
        }
      });
    handleClose();
  };

  function updateCurrentImg(imgNum) {
    setCurrentImage(imgNum);
  }

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentImage(Number(img));
  };

  const handleMouseOver = () => {
    setMouseState(true);
  };

  const handleMouseOut = () => {
    setMouseState(false);
  };
  

  return (
    <>
      <Wrapper>
        {/* <Sidebar>
            {profileImages.map((profileImage, index) => {
              if (index + 1 === Number(img)) {
                return (
                  <ProfileTooltip
                    key={[index, img].join('_')}
                    title={
                      <>
                        <Typography color="inherit">
                          프로필을 변경하려면 👆🏼 클릭해주세요!
                        </Typography>
                      </>
                    }
                  >
                    <ProfileImage
                      src={profileImage}
                      alt="profile"
                      onClick={handleClickOpen}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      isMouseOver={mouseState}
                    />
                  </ProfileTooltip>
                );
              }
              return <span key={[profileImage, index]}> </span>;
            })}
            <div>
              <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  변경할 프로필을 골라주세요
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {profileImages.map((profileImage, index) => {
                      if (index + 1 === currentImage) {
                        return (
                          <SelectedImage
                            key={[profileImage, index]}
                            alt="profile"
                            src={profileImage}
                          />
                        );
                      }
                      return (
                        <VariousImage
                          key={[profileImage, index]}
                          alt="profile"
                          src={profileImage}
                          onClick={() => updateCurrentImg(index + 1)}
                        />
                      );
                    })}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={updateProfile} color="primary" autoFocus>
                    변경하기
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    취소
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        </Sidebar> */}
          <br />
          <br />
        <Main>
          <BasicInfo>
            <Nickname>
              <Title>닉네임</Title>
              <ContentContainer>
                <Content>{nickname}</Content>
                <Link to="/checkpassword">
                  <CommonButton
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    회원정보수정
                  </CommonButton>
                </Link>
              </ContentContainer>
            </Nickname>
            <Email>
              <Title>이메일: </Title>
              <Content>{email}</Content>
            </Email>
          </BasicInfo>
          
          <Record>
            <Title getMoreMB>내 기록</Title>
            <MyTable />
          </Record>

          <Title getMoreMB getMoreMT>
            면접 원 그래프
          </Title>
          <Message>
              오늘도 즐거운 면접 연습!!!!!!😀
            </Message>
       
          <Chart />
        
          <Footer>
            {/* <DeleteModal /> */}
          </Footer>
        </Main>
      </Wrapper>
    </>
  );
}