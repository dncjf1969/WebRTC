import React, { useState } from 'react';
import styles from 'styled-components';
import MakeRoomModal from './MakeRoomModal';

const Wrapper = styles.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid rgba(1, 208, 83, 1);
  border-bottom: solid rgba(1, 208, 83, 1);
`;

const Links = styles.ul`
  & > * {
    margin-right: 25px;
    
  } > span
  {
    cursor: pointer;
  }
`;

function RoomList() {
  const [isMakeOpen, setIsMakeOpen] = useState(false);
  const handleMakeModal = () => setIsMakeOpen(false);

  return (
    <Wrapper>
      <div>
        <h1>Roomlist</h1>
      </div>

      <MakeRoomModal
        fullWidth
        isOpen={isMakeOpen}
        handleModalClose={handleMakeModal}
      />
      
      <Links>
        <button type="button" onClick={() => setIsMakeOpen(true)}>
          방만들기
        </button>
      </Links>
    </Wrapper>
  );
}

 
  
export default RoomList;