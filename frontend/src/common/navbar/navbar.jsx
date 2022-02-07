import React, { useState } from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import DropDownMenu from './NavbarDropdown';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components'
import './navbar'
import logo from '../../assets/logo.png'
import Button from '@mui/material/Button'
import { Container } from 'react-bootstrap'


const Wrapper = styles.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  position: block;
  width: 100%;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 1);
`;

const Logo = styles.div`
  width: 10%;
  height: 10%;
  background-image: url(${logo})
`;

const Links = styles.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin-right: 25px;
    cursor: pointer;
  } > button {
    font-size: 1rem;
  };
}
`;

function Navbar() {
  return (
<Navbar bg="dark" variant="dark">
  <Container>
      <Navbar.Brand href="/">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      React Bootstrap
      </Navbar.Brand>
    <Link id='logo' to="/">
      <IconButton>
        <HomeRoundedIcon/>
          Home
      </IconButton>
    </Link>
    
    <Link id='nonline'to="/signup">회원가입</Link>
    <Link id='nonline'to="/login">로그인</Link>
    <Link id='nonline'to="/roomlist">방리스트</Link>
    
    <DropDownMenu />
    </Container>
  </Navbar>
    // <Wrapper>
    //   <Logo />
    //   <Links>
        
    //   </Links>
    // </Wrapper>
    
  )
}

export default Navbar;