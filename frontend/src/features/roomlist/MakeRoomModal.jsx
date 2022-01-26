import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ImageField = styled.img`
  width: 30%;
`;

const useStyles = makeStyles({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogactions: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function MakeRoomModal({ isOpen, handleModalClose }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          방 만들기
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText>
            방은 Private으로 만들어지며, 비밀번호를 설정해주시면 됩니다!
          </DialogContentText>
          <ImageContainer>
            <ImageField src="https://picsum.photos/1" />
            <ImageField src="https://picsum.photos/2" />
            <ImageField src="https://picsum.photos/3" />
          </ImageContainer>
          <TextField autoFocus margin="dense" id="roomName" label="방 제목" />
          <TextField autoFocus margin="dense" id="password" label="비밀번호" />
          <FormControl>
            <InputLabel id="demo-simple-select-label">인원수</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>
          
        </DialogContent>
        <DialogActions className={classes.dialogactions}>
          <Button onClick={handleModalClose} color="primary">
            방만들기
          </Button>
          <Button onClick={handleModalClose} color="secondary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MakeRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};