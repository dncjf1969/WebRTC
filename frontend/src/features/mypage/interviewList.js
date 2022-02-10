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

function NestedModal(props) {
  const { index, style } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem onClick={handleOpen} style={style} key={index} component="div" disablePadding>
        <ListItemButton >
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Style, width: 200 }}>
          <h2 id="child-modal-title">면접 피드백이당</h2>
          <p id="child-modal-description">
            나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철 나는 이우철
          </p>
          <br />
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={70}
        itemCount={10}
        overscanCount={5}
      >
        {NestedModal}
      </FixedSizeList>
    </Box>
  );
}


