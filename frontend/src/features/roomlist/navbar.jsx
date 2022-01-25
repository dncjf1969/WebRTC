import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styles.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 1);
`;

const Logo = styles.div`
  width: 50px;
  height: 100%;
  background-image: url(https://picsum.photos/50/65)
`;

const Links = styles.ul`
  & > * {
    margin-right: 25px;
  } > span
  {
    cursor: pointer;
  }
`;

function Navbar() {
 
  return (
    <Wrapper>
      <Logo />
      <Links>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/roomlist">Room</Link>
        
      </Links>
    </Wrapper>
  );
}

export default Navbar;