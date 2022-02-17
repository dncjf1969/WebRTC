import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import styled from "styled-components";

import "./SelectCharacter.css";

const Style = {
  position: "absolute",
  top: "20%",
  left: "37%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px  #4e4e4e",

  boxShadow: 5,
  p: 4,
};
// #green {
//   background: rgba(218, 221, 221, 0.463);
//   /* opacity: 0.6; */
//   color: rgb(8, 1, 1);
// }
const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.3rem;
`;

function SelectCharacter(props) {
  //  const [modalInfo, setModalInfo] = React.useState();
  //  const [modalInfo2, setModalInfo2] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [charNum, setCharNum] = React.useState("");
  const [characterURL, setCharacterURL] = useState("");
  const [status, setStatus] = useState("outlined");
  const handleOpen = (e) => {
    setOpen(true);
    setStatus("contained");
  };
  const handleClose = () => {
    setOpen(false);
    console.log(charNum);
    let charURL =
      "https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/";
    setCharacterURL(charURL + charNum + ".PNG");
    props.setCharacterNumber(charNum);
  };

  const setCharNumber = (val) => {
    setCharNum(val);
  };

  return (
    <React.Fragment>
      <div className="">
        <Button onClick={(e) => handleOpen(e)} variant={status} size="small">
          캐릭터 선택
        </Button>
        <img className="" src={characterURL}></img>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box data-aos="fade-up" sx={{ ...Style, borderRadius: 8 }}>
          <Title>
            <span className="text-slate-700">나의 캐릭터를 선택해주세요</span>
          </Title>
          <ul className="cursor-pointer flex flex-auto">
            {charNum === 0 ? (
              <img
                class="selectedChar"
                className="cursor-pointer"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/0.PNG"
                onClick={(e) => setCharNumber(0)}
              ></img>
            ) : (
              <img
                class="char"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/0.PNG"
                onClick={(e) => setCharNumber(0)}
              ></img>
            )}
            {charNum === 1 ? (
              <img
                class="selectedChar"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/1.PNG"
                onClick={(e) => setCharNumber(1)}
              ></img>
            ) : (
              <img
                class="char"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/1.PNG"
                onClick={(e) => setCharNumber(1)}
              ></img>
            )}
            {charNum === 2 ? (
              <img
                class="selectedChar"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/2.PNG"
                onClick={(e) => setCharNumber(2)}
              ></img>
            ) : (
              <img
                class="char"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/2.PNG"
                onClick={(e) => setCharNumber(2)}
              ></img>
            )}
            {charNum === 3 ? (
              <img
                class="selectedChar"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/3.PNG"
                onClick={(e) => setCharNumber(3)}
              ></img>
            ) : (
              <img
                class="char"
                src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/frontend/frontend/src/images/3.PNG"
                onClick={(e) => setCharNumber(3)}
              ></img>
            )}
            {/* <li><img class="char" id="char0" src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/src/images/0.PNG" onClick={(e)=>setCharNumber(0)}></img></li> */}
            {/* <li></li>
            <li><img class="char" id="char2" src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/src/images/2.PNG" onClick={(e)=>setCharNumber(2)}></img></li>
            <li><img class="char" id="char3" src="https://lab.ssafy.com/s06-webmobile1-sub2/S06P12E201/-/raw/hyun/frontend/src/images/3.PNG" onClick={(e)=>setCharNumber(3)}></img></li> */}
          </ul>
          <Button onClick={handleClose}>확인</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default SelectCharacter;
