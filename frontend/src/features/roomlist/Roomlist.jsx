import React, { useState } from 'react';
import styles from 'styled-components';
import MakeRoomModal from './MakeRoomModal';
import FindRoomModal from './FindRoomModal';
import CustomizedInputBase from './searchbar2';
// import DataTable from './roomarray2';

const Wrapper = styles.div`
  background-color: Bisque;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [isFindOpen, setIsFindOpen] = useState(false);
  const handleFindModal = () => setIsFindOpen(false);

  return (
    <Wrapper>
      <div>
        <h1>Roomlist</h1>

      </div>
      
      <CustomizedInputBase />
      <MakeRoomModal
        fullWidth
        isOpen={isMakeOpen}
        handleModalClose={handleMakeModal}
      />
      {/* fullWidth는 Material UI의 Text field 컴포넌트임 (시각자료 보면 이해 ok)
      fullWidth
      MakeRoomModal컴포넌트로 가게될 2가지 props (isOpen, handleModalClose)
      클릭하면 onClick함수에 의해 setIsMakeOpen(true)로 인해 isMakeOpen이 true가 되어 모달창이 열림  handleMakeModal의 값에 따라 창이 닫힘 */}
      
      <FindRoomModal
        fullWidth
        isOpen={isFindOpen}
        handleModalClose={handleFindModal}
      />
      
      <Links>
        <button type="button" onClick={() => setIsMakeOpen(true)}>
          방만들기
        </button>
        <button type="button" onClick={() => setIsFindOpen(true)}>
          방찾기
        </button>
      </Links>
      
    </Wrapper>
    
    // <DataTable />
   
    
  );
}

 
  
export default RoomList;