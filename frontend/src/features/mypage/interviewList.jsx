import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import ListSubheader from '@mui/material/ListSubheader';
import { useState } from 'react';

const Style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log()

  return (
    <React.Fragment>

      {/* {MeetingInfo.map((info) =>  */}
        <Button onClick={handleOpen}>Open Child Modal</Button>
      {/* )} */}


      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Style, width: 200 }}>
            <h2 id="child-modal-title">Text in a child modal</h2>

          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}




export default function NestedModal({MeetingInfo}) {
  const index = 1;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(MeetingName)

  return (
    <div>
      {MeetingInfo.map((info) => 
        <ul key={`section-${info.list[0].id}`}>
          <li>
          <ListItem onClick={handleOpen} key={info.list[0].meetingName} component="div" disablePadding>
            <ListItemButton >
              <ListItemText primary={info.list[0].meetingName} />
            </ListItemButton>
          </ListItem>
          </li>
        </ul>
      )}

      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Style, width: 200 }}>
          <h2 id="child-modal-title">[면접 피드백이당]</h2>
          <div id="child-modal-description">
            <text>받은 질문 리스트</text>
          </div>
          <br />
          {MeetingInfo.map((info) => 
              <ListItemButton onClick={handleOpen} >{info.list[0].question}</ListItemButton>
          )}

          {/* <ChildModal /> */}
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}


