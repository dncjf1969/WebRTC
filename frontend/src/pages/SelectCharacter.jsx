import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import styled from "styled-components";
import Character0 from "../images/00.png"
import Character1 from "../images/01.png"
import Character2 from "../images/02.png"
import Character3 from "../images/03.png"
import Character4 from "../images/04.png"
import Character5 from "../images/05.png"

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

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.3rem;
`;

function SelectCharacter(props) {
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
    let temp = ""
    switch (charNum) {
      case 0:
        temp = Character0
        break
      case 1:
        temp = Character1
        break
      case 2:
        temp = Character2
        break
      case 3:
        temp = Character3
        break
      case 4:
        temp = Character4
        break
      case 5:
        temp = Character5
        break
      default:
        temp = ""
    }
    setCharacterURL(temp);
    props.setCharacterNumber(charNum);
  };

  const setCharNumber = (val) => {
    setCharNum(val);
  };

  return (
    <React.Fragment>
      <div className="flex">
        <Button onClick={(e) => handleOpen(e)} variant={status} size="small">
          캐릭터 선택
        </Button>
        {charNum !== '' ?
        <img className="ml-2" src={characterURL} alt='' style={{'height': '30px', 'width': '30px'}}></img>
        : null}
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
          <ul className="cursor-pointer flex flex-auto mx-auto">
            {charNum === 0 ? (
              <img
                class="selectedChar"
                className="cursor-pointer"
                src={Character0}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(0)}
                alt=""
              ></img>
            ) : (
              <img
                class="char"
                src={Character0}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(0)}
                alt=""
              ></img>
            )}
            {charNum === 1 ? (
              <img
                class="selectedChar"
                src={Character1}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(1)}
                alt=""
              ></img>
            ) : (
              <img
                class="char"
                src={Character1}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(1)}
                alt=""
              ></img>
            )}
            {charNum === 2 ? (
              <img
                class="selectedChar"
                src={Character2}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(2)}
                alt=""
              ></img>
            ) : (
              <img
                class="char"
                src={Character2}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(2)}
                alt=""
              ></img>
            )}
            {charNum === 3 ? (
              <img
                class="selectedChar"
                src={Character3}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(3)}
                alt=""
              ></img>
            ) : (
              <img
                class="char"
                src={Character3}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(3)}
                alt=""
              ></img>
            )}
            {charNum === 4 ? (
              <img
                class="selectedChar"
                src={Character4}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(4)}
                alt=""
              ></img>
            ) : (
              <img
                class="char"
                src={Character4}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(4)}
                alt=""
              ></img>
            )}
            {charNum === 5 ? (
              <img
                class="selectedChar"
                src={Character5}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(5)}
                alt=""
              ></img>
            ) : (
              <img
                class="char"
                src={Character5}
                style={{'height': '55px', 'width': '55px'}}
                onClick={(e) => setCharNumber(5)}
                alt=""
              ></img>
            )}
          </ul>
          <Button onClick={handleClose}>확인</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default SelectCharacter;
