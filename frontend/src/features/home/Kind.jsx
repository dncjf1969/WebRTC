import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// material UI에서 제공하는 css 속성 Button import
import { Button, makeStyles } from '@material-ui/core';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 60%;
`;
// makeStyles: Material UI에서 제공하는 훅
// 인자로 커스텀 스타일 객체를 받음
const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #ff859f 30%, #ffa87a 70%)',
    borderRadius: 7,
    border: 0,
    fontWeight: 'bold',
    color: 'white',
    height: 40,
    marginTop: '10px',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 70%)',
    },
  },
});

function Kind({ imgSrc, title }) {
  // 위에서 makeStyles훅으로 작성한 함수 useStyles를 호출한 결과를 classes 변수에 저장
  // 그 당므 커스텀 스타일이 필요한 곳에 className prop의 값으로 classes 변수에 저장된 클래스 이름 넘겨줌
  const classes = useStyles();

  return (
    <ImageContainer>
      <Image src={imgSrc} />
      <Button className={classes.button} type="primary">
        {title}
      </Button>
    </ImageContainer>
  );
}

Kind.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Kind;
