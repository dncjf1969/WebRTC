import React  from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import DropDownMenu from './NavbarDropdown';

const Wrapper = styles.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 1);
`;

const Logo = styles.div`
  width: 50px;
  height: 100%;
  background-image: url(https://picsum.photos/50/65)
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
    <Wrapper>
      <Logo />
      <Links>
        <Link to="/">Home</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/login">로그인</Link>
        <Link to="/roomlist">방리스트</Link>
        
        <DropDownMenu />
      </Links>
    </Wrapper>
  );
}

export default Navbar;