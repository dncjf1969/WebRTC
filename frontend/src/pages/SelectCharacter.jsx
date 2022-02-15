import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import styled from "styled-components";

const Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 400,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.5rem;
  border-bottom: 5px solid rgba(251, 209, 75, 0.5);
`;

function SelectCharacter(props) {
//  const [modalInfo, setModalInfo] = React.useState();
//  const [modalInfo2, setModalInfo2] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [charNum, setCharNum] = React.useState("");
  const [characterURL, setCharacterURL] = useState("");

  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(charNum);
    let charURL = "https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/design/src/images/";
    setCharacterURL(charURL + charNum + ".PNG");
    props.setCharacterNumber(charNum);
  };

  const setCharNumber = (val) =>{
    setCharNum(val);
  };

  return (
    <React.Fragment>
      <div>
        <img src={characterURL}></img>
      </div>
      <Button onClick={(e)=>handleOpen(e)}>캐릭터 선택</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Style, width: 400, height:700 }}>
          <Title>캐릭터 선택</Title>
          <ul>
            <li><img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/design/src/images/0.PNG"></img><input type="radio" name="charSel" value="0" onClick={(e)=>setCharNumber(0)}></input></li>
            <li><img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/design/src/images/1.PNG"></img><input type="radio" name="charSel" value="1" onClick={(e)=>setCharNumber(1)}></input></li>
            <li><img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/design/src/images/2.PNG"></img><input type="radio" name="charSel" value="2" onClick={(e)=>setCharNumber(2)}></input></li>
            <li><img src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/design/src/images/3.PNG"></img><input type="radio" name="charSel" value="3" onClick={(e)=>setCharNumber(3)}></input></li>
          </ul>
           <Button onClick={handleClose}>확인</Button>
         </Box>
      </Modal>
    </React.Fragment>
  );
}

export default SelectCharacter;