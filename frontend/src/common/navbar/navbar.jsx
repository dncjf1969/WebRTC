import React, { useState } from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import MakeRoomModal from './MakeRoomModal';
import FindRoomModal from './FindRoomModal';

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
  const [isMakeOpen, setIsMakeOpen] = useState(false);
  const handleMakeModal = () => setIsMakeOpen(false);
  const [isFindOpen, setIsFindOpen] = useState(false);
  const handleFindModal = () => setIsFindOpen(false);
  return (
    <Wrapper>
      <Logo />
      <MakeRoomModal
      // fullWidth는 Material UI의 Text field 컴포넌트임 (시각자료 보면 이해 ok)
        // fullWidth
        // MakeRoomModal컴포넌트로 가게될 2가지 props (isOpen, handleModalClose)
        // 클릭하면 onClick함수에 의해 setIsMakeOpen(true)로 인해 isMakeOpen이 true가 되어 모달창이 열림  handleMakeModal의 값에 따라 창이 닫힘
        isOpen={isMakeOpen}
        handleModalClose={handleMakeModal}
      />
      <FindRoomModal
        fullWidth
        isOpen={isFindOpen}
        handleModalClose={handleFindModal}
      />
      <Links>
        <Link to="/signup">회원가입</Link>
        <button type="button" onClick={() => setIsMakeOpen(true)}>
          방만들기
        </button>
        <button type="button" onClick={() => setIsFindOpen(true)}>
          방찾기
        </button>
        <Link to="/">홈페이지</Link>
        <DropDownMenu />
      </Links>
    </Wrapper>
  );
}

export default Navbar;