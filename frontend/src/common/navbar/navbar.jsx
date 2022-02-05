import React, { useState } from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import DropDownMenu from './NavbarDropdown';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components'

import logo from '../../assets/logo.png'

const HeaderBlock = styled.div`
  position:fixed;
  width:100%;
  background:white;
`;

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
  }
`;

function Navbar() {
  return (
    <HeaderBlock>
    <Wrapper>
      <Logo />
      <Links>

        <Link to="/">
          <IconButton>
            <HomeRoundedIcon/>
              Home
          </IconButton>
        </Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/login">로그인</Link>
        <Link to="/roomlist">방리스트</Link>
        
        <DropDownMenu />
      </Links>
      </Wrapper>
      </HeaderBlock>
  );
}

export default Navbar;