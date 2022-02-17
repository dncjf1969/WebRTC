import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
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
  border-bottom: 2px solid rgba(251, 209, 75, 0.5);
`;

function ChildModal({ MeetingInfo, info }) {
  const [modalInfo, setModalInfo] = React.useState();
  const [modalInfo2, setModalInfo2] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (e, _item) => {
    setOpen(true);
    setModalInfo(_item.comment);
    setModalInfo2(_item.rate);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log("MeetingInfo: ", MeetingInfo);
  console.log("childInfo: ", info);

  return (
    <React.Fragment>
      {info.list.map((item) => (
        <Button onClick={(e) => handleOpen(e, item)}>{item.question}</Button>
      ))}

      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Style, width: 300, height: 300, border:2, borderRadius: 2 }}>
          <Title>피드백 내용</Title>
          <br />
          <h2 id="child-modal-title">comment : {modalInfo}</h2>
          <h2 id="child-modal-title">rate : {modalInfo2}점</h2>
          <br />
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({ MeetingInfo }) {
  const index = 1;
  const [open, setOpen] = useState(false);
  const [Infomation, SetInfomation] = useState([]);
  const [childInfo, setChildInfo] = useState([]);

  const handleOpen = (e, _info) => {
    setOpen(true);
    setChildInfo(_info);
    console.log("handleOpen: ", _info);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <span className="ml-4"> 날짜 </span>
        {MeetingInfo.map((info) => (
          <ul key={`section-${info.list[0].id}`}>
            <li>
              <ListItem
                onClick={(e) => handleOpen(e, info)}
                key={info.list[0].id}
                component="div"
                disablePadding
              ></ListItem>
            </li>
          </ul>
        ))}
      </div>
      <div className="basis-3/4">
        <span className="ml-4">방제목</span>
        {MeetingInfo.map((info) => (
          <ul key={`section-${info.list[0].id}`}>
            <li>
              <ListItem
                onClick={(e) => handleOpen(e, info)}
                key={info.list[0].meetingName}
                component="div"
                disablePadding
              >
                <ListItemButton>
                  <ListItemText primary={info.list[0].meetingName} />
                </ListItemButton>
              </ListItem>
            </li>
          </ul>
        ))}
      </div>

      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Style, width: 500, height: 400, border:2, borderRadius: 2 }}>
          <div id="child-modal-description">
            <Title>받은 질문 리스트</Title>
          </div>
          <br />

          <div>
            <ChildModal MeetingInfo={MeetingInfo} info={childInfo} />
          </div>
          <Button onClick={handleClose}>닫기</Button>
        </Box>
      </Modal>
    </div>
  );
}
